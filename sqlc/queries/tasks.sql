-- name: InsertTask :exec
INSERT INTO tasks (task_id)
VALUES (?);

-- name: InsertTaskLog :exec
INSERT INTO task_logs (task_id, task_log_id, title, description, done, deadline)
VALUES (?, ?, ?, ?, ?, ?);

-- name: SelectLatestTaskLogs :many
SELECT tl.*
FROM task_logs tl
         JOIN (SELECT task_log_id, RANK() OVER (PARTITION BY task_id ORDER BY task_log_id desc) AS rnk
               FROM task_logs) ltl USING (task_log_id)
WHERE ltl.rnk = 1;