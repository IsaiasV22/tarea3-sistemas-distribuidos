DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id TEXT PRIMARY KEY,
  book_id INTEGER,
  book_title TEXT,
  reviewer TEXT,
  rating INTEGER,
  comment TEXT,
  review_date TEXT
);

INSERT INTO reviews (id, book_id, book_title, reviewer, rating, comment, review_date) VALUES
  ('1', 1, 'Operating System Concepts', 'Maria Rodriguez', 5, 'Clear explanations of process scheduling and memory management.', '2024-02-10'),
  ('2', 2, 'Database System Concepts', 'Carlos Jimenez', 4, 'Solid coverage of relational theory, a bit dense for beginners.', '2024-03-22'),
  ('3', 3, 'Computer Networks', 'Ana Fernandez', 5, 'Great balance between theory and real protocol examples.', '2024-05-14'),
  ('4', 4, 'Modern Operating Systems', 'Luis Vargas', 4, 'Comprehensive, though some chapters overlap with the OS Concepts book.', '2024-07-01');
