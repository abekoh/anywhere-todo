package main

import (
	"log"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/abekoh/everywhere-todo/graph"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	gqlSrv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

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
