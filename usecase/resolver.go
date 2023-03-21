//go:generate go run github.com/99designs/gqlgen generate
package usecase

import (
	"github.com/abekoh/anywhere-todo/domain/model/task/taskrepo"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	taskRepo *taskrepo.Repository
}

func NewResolver() *Resolver {
	return &Resolver{
		taskRepo: &taskrepo.Repository{},
	}
}
