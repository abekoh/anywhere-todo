package usecase

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.26

import (
	"context"
	"fmt"

	"github.com/abekoh/everywhere-todo/ctxx"
	"github.com/abekoh/everywhere-todo/domain/model/task"
	"github.com/abekoh/everywhere-todo/graph"
	"github.com/abekoh/everywhere-todo/graph/model"
	"github.com/abekoh/everywhere-todo/sqlc"
	"github.com/oklog/ulid/v2"
	perrors "github.com/pkg/errors"
)

// CreateTask is the resolver for the createTask field.
func (r *mutationResolver) CreateTask(ctx context.Context, input model.NewTask) (*model.Task, error) {
	t := task.Task{
		TaskLogID: task.LogID(ulid.Make().String()),
		TaskID:    task.ID(ulid.Make().String()),
		Title:     input.Title,
		Detail:    input.Detail,
		Done:      false,
		Deadline:  input.Deadline,
	}
	vt, err := t.Validate()
	if err != nil {
		return nil, perrors.WithStack(err)
	}
	if err := r.taskRepo.Create(ctx, vt); err != nil {
		return nil, perrors.WithStack(err)
	}
	return &model.Task{
		TaskLogID: string(vt.TaskLogID),
		TaskID:    string(vt.TaskID),
		Title:     vt.Title,
		Detail:    vt.Detail,
		Done:      vt.Done,
		Deadline:  vt.Deadline,
	}, nil
}

// UpdateTask is the resolver for the updateTask field.
func (r *mutationResolver) UpdateTask(ctx context.Context, input model.UpdatedTask) (*model.Task, error) {
	vt, err := r.taskRepo.Get(ctx, task.ID(input.TaskID))
	if err != nil {
		return nil, err
	}
	t := vt.Task
	if input.Title != nil {
		t.Title = *input.Title
	}
	if input.Detail != nil {
		t.Detail = input.Detail
	}
	if input.Done != nil {
		t.Done = *input.Done
	}
	if input.Deadline != nil {
		t.Deadline = input.Deadline
	}
	newVt, err := t.Validate()
	if err != nil {
		return nil, perrors.WithStack(err)
	}
	if err := r.taskRepo.Update(ctx, newVt); err != nil {
		return nil, perrors.WithStack(err)
	}
	return &model.Task{
		TaskLogID: string(newVt.TaskLogID),
		TaskID:    string(newVt.TaskID),
		Title:     newVt.Title,
		Detail:    newVt.Detail,
		Done:      newVt.Done,
		Deadline:  newVt.Deadline,
	}, nil
}

// Tasks is the resolver for the tasks field.
func (r *queryResolver) Tasks(ctx context.Context) ([]*model.Task, error) {
	queries := sqlc.New(ctxx.GetDB(ctx))
	tasks, err := queries.SelectLatestTaskLogs(ctx)
	if err != nil {
		return nil, perrors.WithStack(err)
	}
	return MapSlices(tasks, MapTaskSQLC2GQL), nil
}

// SubTasks is the resolver for the subTasks field.
func (r *taskResolver) SubTasks(ctx context.Context, obj *model.Task) ([]*model.SubTask, error) {
	panic(fmt.Errorf("not implemented: SubTasks - subTasks"))
}

// Mutation returns graph.MutationResolver implementation.
func (r *Resolver) Mutation() graph.MutationResolver { return &mutationResolver{r} }

// Query returns graph.QueryResolver implementation.
func (r *Resolver) Query() graph.QueryResolver { return &queryResolver{r} }

// Task returns graph.TaskResolver implementation.
func (r *Resolver) Task() graph.TaskResolver { return &taskResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type taskResolver struct{ *Resolver }
