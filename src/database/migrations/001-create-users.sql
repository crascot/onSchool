CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role_id INTEGER NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE IF NOT EXISTS admin_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
	last_login TEXT DEFAULT CURRENT_TIMESTAMP,
	phone TEXT NOT NULL UNIQUE,
  user_id INTEGER NOT NULL UNIQUE,
  school_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (school_id) REFERENCES schools(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS teacher_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject_specialization TEXT NOT NULL, -- специализация (Математика, Физика)
  experience_years  INTEGER NOT NULL,   -- опыт работы
  qualification TEXT NOT NULL,          -- квалификация (бакалавр, магистрант)
  employment_date TEXT DEFAULT CURRENT_TIMESTAMP,        -- дата регистрации
  salary INTEGER NOT NULL,
  user_id INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS parent_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  balance INTEGER DEFAULT 0,
  address TEXT NOT NULL,
  relationship TEXT NOT NULL,           -- связь с учеником (мать, отец)
  emergency_contact TEXT NOT NULL,      -- контакт с родителем
  user_id INTEGER NOT NULL UNIQUE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS student_details (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL UNIQUE,
  class_id INTEGER NOT NULL,
  parent_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES parent_details(id)
);