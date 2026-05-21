CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES
    ('Testerman', 'http://blogtestman', 'Test man journal', 10),
    ('Testerman', 'http://blogtestman2', 'Test man journal 2', 5);
