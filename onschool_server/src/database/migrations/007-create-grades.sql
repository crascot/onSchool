CREATE TABLE IF NOT EXISTS grades (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    grade INTEGER,
    diary_id INTEGER,
    lesson_id INTEGER,
    FOREIGN KEY (diary_id) REFERENCES diaries(id),
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
)