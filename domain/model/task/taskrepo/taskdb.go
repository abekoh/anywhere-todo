package taskrepo

import (
	"context"
	"database/sql"
	"time"

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
		TaskID:      string(task.TaskID),
		TaskLogID:   string(task.TaskLogID),
		Title:       task.Title,
		Description: toNullString(task.Description),
		Done:        toIntBool(task.Done),
		Deadline:    toNullTime(task.Deadline),
	}); err != nil {
		return errors.WithStack(err)
	}
	return nil
}

func toIntBool(b bool) int64 {
	if b {
		return 1
	} else {
		return 0
	}
}

func toNullString(s *string) sql.NullString {
	if s == nil {
		return sql.NullString{}
	}
	return sql.NullString{
		String: *s,
		Valid:  true,
	}
}

func toNullTime(t *time.Time) sql.NullTime {
	if t == nil {
		return sql.NullTime{}
	}
	return sql.NullTime{
		Time:  *t,
		Valid: true,
	}
}
