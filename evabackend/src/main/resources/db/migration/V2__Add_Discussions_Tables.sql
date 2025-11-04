CREATE TABLE discussions (
    id BIGSERIAL PRIMARY KEY,
    course_id VARCHAR(255) NOT NULL REFERENCES courses(id),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    author_id BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes INT DEFAULT 0,
    views INT DEFAULT 0,
    pinned BOOLEAN DEFAULT false,
    resolved BOOLEAN DEFAULT false
);

CREATE TABLE replies (
    id BIGSERIAL PRIMARY KEY,
    discussion_id BIGINT NOT NULL REFERENCES discussions(id),
    content TEXT NOT NULL,
    author_id BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes INT DEFAULT 0
);

CREATE INDEX idx_discussions_course ON discussions(course_id);
CREATE INDEX idx_discussions_created ON discussions(created_at DESC);
CREATE INDEX idx_replies_discussion ON replies(discussion_id);