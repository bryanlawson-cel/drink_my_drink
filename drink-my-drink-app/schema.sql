-- Drop tables if they exist
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS coffees;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create coffees table (user-created coffees)
CREATE TABLE coffees (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  directions TEXT NOT NULL,
  hashtags TEXT[], -- Array of hashtags
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create ratings table
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  coffee_id INTEGER NOT NULL, -- Can reference popular coffees (1-4) or user coffees
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  hashtags TEXT[], -- User's personal hashtags for this rating
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, coffee_id) -- One rating per user per coffee
);

-- Create indexes for better performance
CREATE INDEX idx_coffees_user_id ON coffees(user_id);
CREATE INDEX idx_ratings_user_id ON ratings(user_id);
CREATE INDEX idx_ratings_coffee_id ON ratings(coffee_id);

-- Insert sample data (optional)
INSERT INTO users (username, password_hash) VALUES 
  ('demo', '$2a$10$demo.hash.placeholder.only.for.testing.purposes');

COMMENT ON TABLE users IS 'Stores user accounts';
COMMENT ON TABLE coffees IS 'User-created coffee recipes';
COMMENT ON TABLE ratings IS 'User ratings for both popular and custom coffees';
