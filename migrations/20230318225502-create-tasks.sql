-- +migrate Up
CREATE TABLE tasks
(
    task_id    TEXT PRIMARY KEY,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE task_logs
(
    task_log_id TEXT PRIMARY KEY,
    task_id     TEXT REFERENCES tasks (task_id) ON DELETE CASCADE,
    title       TEXT      NOT NULL,
    description TEXT,
    done        INTEGER   NOT NULL DEFAULT 0,
    deadline    TIMESTAMP,
    created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- +migrate Down
DROP TABLE task_logs;
DROP TABLE tasks;
