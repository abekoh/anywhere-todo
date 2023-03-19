package task

import (
	"time"
)

type (
	ID    string
	LogID string

	Task struct {
		TaskLogID LogID
		TaskID    ID
		Title     string
		Detail    *string
		Done      bool
		Deadline  *time.Time
	}
)

type ValidatedTask struct {
	*Task
}

func (t Task) Validate() (*ValidatedTask, error) {
	// TODO: validation
	return &ValidatedTask{Task: &t}, nil
}
