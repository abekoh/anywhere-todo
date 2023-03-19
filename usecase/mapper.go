package usecase

import (
	"github.com/abekoh/everywhere-todo/graph/model"
	"github.com/abekoh/everywhere-todo/sqlc"
	"github.com/abekoh/everywhere-todo/utils"
)

func MapSlices[S, T any](xs []S, mapper func(x S) T) []T {
	ys := make([]T, len(xs))
	for i, x := range xs {
		ys[i] = mapper(x)
	}
	return ys
}

func MapTaskSQLC2GQL(t sqlc.TaskLog) *model.Task {
	return &model.Task{
		TaskLogID: t.TaskLogID,
		TaskID:    t.TaskID,
		Title:     t.Title,
		Detail:    utils.ToString(t.Detail),
		Done:      utils.ToBool(t.Done),
		Deadline:  utils.ToTime(t.Deadline),
	}
}
