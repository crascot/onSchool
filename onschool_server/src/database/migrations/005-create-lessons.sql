CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    schedule_id INTEGER NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES schedule (id)
)