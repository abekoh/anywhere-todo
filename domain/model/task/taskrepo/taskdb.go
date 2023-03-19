package taskrepo

import (
	"context"

	"github.com/abekoh/everywhere-todo/ctxx"
	"github.com/abekoh/everywhere-todo/domain/model/task"
	"github.com/abekoh/everywhere-todo/sqlc"
	"github.com/abekoh/everywhere-todo/utils"
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
		Detail:    utils.ToNullString(task.Detail),
		Done:      utils.ToInt64Bool(task.Done),
		Deadline:  utils.ToNullTime(task.Deadline),
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
			Detail:    utils.ToString(tl.Detail),
			Done:      utils.ToBool(tl.Done),
			Deadline:  utils.ToTime(tl.Deadline),
		},
	}, nil
}
