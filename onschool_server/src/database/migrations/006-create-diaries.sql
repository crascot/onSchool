CREATE TABLE IF NOT EXISTS diaries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER UNIQUE,
  FOREIGN KEY (student_id) REFERENCES student_details(id) ON DELETE CASCADE
)