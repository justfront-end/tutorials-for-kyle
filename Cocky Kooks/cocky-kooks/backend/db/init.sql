-- Create surfboards table
CREATE TABLE surfboards (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    image_url TEXT
);

-- Create cart submissions table
CREATE TABLE cart_submissions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    selected_boards JSONB,
    submitted_at TIMESTAMP DEFAULT NOW()
);
