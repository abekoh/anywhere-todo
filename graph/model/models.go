package model

import "time"

type Task struct {
	TaskID    string     `json:"taskId"`
	TaskLogID string     `json:"taskLogId"`
	Title     string     `json:"title"`
	Detail    *string    `json:"detail"`
	Done      bool       `json:"done"`
	Deadline  *time.Time `json:"deadline"`
}
