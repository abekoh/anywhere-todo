//go:generate go run github.com/kyleconroy/sqlc/cmd/sqlc generate
package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/abekoh/everywhere-todo/ctxx"
	"github.com/abekoh/everywhere-todo/graph"
	"github.com/abekoh/everywhere-todo/usecase"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/mattn/go-sqlite3"
	migrate "github.com/rubenv/sql-migrate"
)

func main() {
	db, err := sql.Open("sqlite3", "test.db")
	if err != nil {
		log.Fatal(err)
	}

	execMigrate(db)

	e := echo.New()

	// TODO: strict config
	e.Use(middleware.CORSWithConfig(middleware.DefaultCORSConfig))

	e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			ctx := c.Request().Context()
			ctx = ctxx.SetDB(ctx, db)
			c.SetRequest(c.Request().WithContext(ctx))
			return next(c)
		}
	})

	gqlSrv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: usecase.NewResolver()}))

	e.POST("query", func(c echo.Context) error {
		gqlSrv.ServeHTTP(c.Response(), c.Request())
		return nil
	})

	playHandler := playground.Handler("GraphQL playground", "/query")
	e.GET("playground", func(c echo.Context) error {
		playHandler.ServeHTTP(c.Response(), c.Request())
		return nil
	})

	log.Fatal(e.Start(":8080"))

}

func execMigrate(db *sql.DB) {
	migrations := &migrate.FileMigrationSource{
		Dir: "migrations",
	}
	n, err := migrate.Exec(db, "sqlite3", migrations, migrate.Up)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Applied %d migrations!\n", n)
}
