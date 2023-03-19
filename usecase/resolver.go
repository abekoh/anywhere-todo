package usecase

import (
	"github.com/abekoh/everywhere-todo/domain/model/task/taskrepo"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	taskRepo *taskrepo.Repository
}
