package taskrepo

import (
	"context"
	"database/sql"

	"github.com/abekoh/everywhere-todo/ctxx"
	"github.com/abekoh/everywhere-todo/domain/model/task"
	"github.com/abekoh/everywhere-todo/sqlc"
	"github.com/pkg/errors"
)

type Repository struct {
}

func (r Repository) Create(ctx context.Context, task *task.ValidatedTask) error {
	queries := sqlc.New(ctxx.GetDB(ctx))
	if err := queries.InsertTask(ctx, string(task.TaskID)); err != nil {
		return errors.WithStack(err)
	}
	if err := queries.InsertTaskLog(ctx, sqlc.InsertTaskLogParams{
		TaskID:      sql.NullString{},
		TaskLogID:   "",
		Title:       "",
		Description: sql.NullString{},
		Done:        0,
		Deadline:    sql.NullTime{},
	}); err != nil {
		return errors.WithStack(err)
	}
	return nil
}
