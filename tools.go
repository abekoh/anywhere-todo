//go:build tools
// +build tools

package main

import (
	_ "github.com/99designs/gqlgen"
	_ "github.com/kyleconroy/sqlc/cmd/sqlc"
)
