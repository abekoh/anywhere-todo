package usecase

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.26

import (
	"context"
	"fmt"

	"github.com/abekoh/everywhere-todo/graph"
	"github.com/abekoh/everywhere-todo/graph/model"
)

// CreateTask is the resolver for the createTask field.
func (r *mutationResolver) CreateTask(ctx context.Context, input model.NewTask) (*model.Task, error) {
	panic(fmt.Errorf("not implemented: CreateTask - createTask"))
}

// UpdateTask is the resolver for the updateTask field.
func (r *mutationResolver) UpdateTask(ctx context.Context, input model.UpdatedTask) (*model.Task, error) {
	panic(fmt.Errorf("not implemented: UpdateTask - updateTask"))
}

// Tasks is the resolver for the tasks field.
func (r *queryResolver) Tasks(ctx context.Context) ([]*model.Task, error) {
	panic(fmt.Errorf("not implemented: Tasks - tasks"))
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