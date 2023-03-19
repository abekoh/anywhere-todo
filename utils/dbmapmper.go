package utils

import (
	"database/sql"
	"time"
)

func ToInt64Bool(b bool) int64 {
	if b {
		return 1
	} else {
		return 0
	}
}

func ToBool(i int64) bool {
	if i == 0 {
		return false
	}
	return true
}

func ToNullString(s *string) sql.NullString {
	if s == nil {
		return sql.NullString{}
	}
	return sql.NullString{
		String: *s,
		Valid:  true,
	}
}

func ToString(s sql.NullString) *string {
	if s.Valid {
		return &s.String
	}
	return nil
}

func ToNullTime(t *time.Time) sql.NullTime {
	if t == nil {
		return sql.NullTime{}
	}
	return sql.NullTime{
		Time:  *t,
		Valid: true,
	}
}

func ToTime(t sql.NullTime) *time.Time {
	if t.Valid {
		return &t.Time
	}
	return nil
}
