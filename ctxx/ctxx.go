package ctxx

import (
	"context"
	"database/sql"
)

type ctxKey int

const (
	dbKey ctxKey = iota
)

func SetDB(ctx context.Context, db *sql.DB) context.Context {
	return context.WithValue(ctx, dbKey, db)
}

func GetDB(ctx context.Context) *sql.DB {
	db, _ := ctx.Value(dbKey).(*sql.DB)
	return db
}
