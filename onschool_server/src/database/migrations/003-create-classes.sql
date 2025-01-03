CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    schedule_id INTEGER NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES schedules(id)
);