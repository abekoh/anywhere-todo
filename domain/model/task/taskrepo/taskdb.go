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
	return r.Update(ctx, task)
}

func (r Repository) Update(ctx context.Context, task *task.ValidatedTask) error {
	queries := sqlc.New(ctxx.GetDB(ctx))
	if err := queries.InsertTaskLog(ctx, sqlc.InsertTaskLogParams{
		TaskID:    string(task.TaskID),
		TaskLogID: string(task.TaskLogID),
		Title:     task.Title,
		Detail:    toNullString(task.Detail),
		Done:      toIntBool(task.Done),
		Deadline:  toNullTime(task.Deadline),
	}); err != nil {
		return errors.WithStack(err)
	}
	return nil
}

func (r Repository) Get(ctx context.Context, id task.ID) (*task.ValidatedTask, error) {
	queries := sqlc.New(ctxx.GetDB(ctx))
	tl, err := queries.SelectLatestTaskLog(ctx, string(id))
	if err != nil {
		return nil, errors.WithStack(err)
	}
	return &task.ValidatedTask{
		Task: &task.Task{
			TaskLogID: task.LogID(tl.TaskLogID),
			TaskID:    task.ID(tl.TaskID),
			Title:     tl.Title,
			Detail:    toString(tl.Detail),
			Done:      toBool(tl.Done),
			Deadline:  toTime(tl.Deadline),
		},
	}, nil
}

func toIntBool(b bool) int64 {
	if b {
		return 1
	} else {
		return 0
	}
}

func toBool(i int64) bool {
	if i == 0 {
		return false
	}
	return true
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

func toString(s sql.NullString) *string {
	if s.Valid {
		return &s.String
	}
	return nil
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

func toTime(t sql.NullTime) *time.Time {
	if t.Valid {
		return &t.Time
	}
	return nil
}
