const { neon } = require('@neondatabase/serverless');
const bcrypt = require('bcryptjs');

// Initialize Neon client
const sql = neon(process.env.DATABASE_URL);

// Helper to send JSON responses
const response = (statusCode, body) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  },
  body: JSON.stringify(body)
});

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return response(200, {});
  }

  const path = event.path.replace('/.netlify/functions/api/', '');
  const method = event.httpMethod;
  
  try {
    // Parse body for POST/PUT requests
    const body = event.body ? JSON.parse(event.body) : {};

    // ROUTES
    
    // User Registration
    if (path === 'register' && method === 'POST') {
      const { username, password } = body;
      
      // Validate input
      if (!username || username.length < 3) {
        return response(400, { error: 'Username must be at least 3 characters' });
      }
      if (!password || password.length < 6) {
        return response(400, { error: 'Password must be at least 6 characters' });
      }
      
      // Check if username exists
      const existing = await sql`SELECT id FROM users WHERE username = ${username}`;
      if (existing.length > 0) {
        return response(400, { error: 'Username already exists' });
      }
      
      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);
      
      // Create user
      const result = await sql`
        INSERT INTO users (username, password_hash, created_at)
        VALUES (${username}, ${passwordHash}, NOW())
        RETURNING id, username, created_at
      `;
      
      return response(201, { 
        message: 'User created successfully',
        user: result[0]
      });
    }
    
    // User Login
    if (path === 'login' && method === 'POST') {
      const { username, password } = body;
      
      // Get user
      const users = await sql`
        SELECT id, username, password_hash, created_at 
        FROM users 
        WHERE username = ${username}
      `;
      
      if (users.length === 0) {
        return response(401, { error: 'Invalid credentials' });
      }
      
      const user = users[0];
      
      // Verify password
      const valid = await bcrypt.compare(password, user.password_hash);
      if (!valid) {
        return response(401, { error: 'Invalid credentials' });
      }
      
      return response(200, {
        id: user.id,
        username: user.username,
        createdAt: user.created_at
      });
    }
    
    // Get User's Coffees
    if (path.startsWith('coffees/user/') && method === 'GET') {
      const userId = path.split('/')[2];
      
      const coffees = await sql`
        SELECT id, user_id, name, location, directions, hashtags, created_at
        FROM coffees
        WHERE user_id = ${userId}
        ORDER BY created_at DESC
      `;
      
      return response(200, { coffees });
    }
    
    // Create Coffee
    if (path === 'coffees' && method === 'POST') {
      const { userId, name, location, directions, hashtags } = body;
      
      if (!name || !directions) {
        return response(400, { error: 'Name and directions are required' });
      }
      
      const result = await sql`
        INSERT INTO coffees (user_id, name, location, directions, hashtags, created_at)
        VALUES (${userId}, ${name}, ${location || null}, ${directions}, ${hashtags || []}, NOW())
        RETURNING id, user_id, name, location, directions, hashtags, created_at
      `;
      
      return response(201, { coffee: result[0] });
    }
    
    // Update Coffee
    if (path.startsWith('coffees/') && method === 'PUT') {
      const coffeeId = path.split('/')[1];
      const { name, location, directions, hashtags } = body;
      
      const result = await sql`
        UPDATE coffees
        SET name = ${name}, 
            location = ${location || null}, 
            directions = ${directions},
            hashtags = ${hashtags || []}
        WHERE id = ${coffeeId}
        RETURNING id, user_id, name, location, directions, hashtags, created_at
      `;
      
      if (result.length === 0) {
        return response(404, { error: 'Coffee not found' });
      }
      
      return response(200, { coffee: result[0] });
    }
    
    // Delete Coffee
    if (path.startsWith('coffees/') && method === 'DELETE') {
      const coffeeId = path.split('/')[1];
      
      await sql`DELETE FROM coffees WHERE id = ${coffeeId}`;
      
      return response(200, { message: 'Coffee deleted' });
    }
    
    // Get All Ratings for a User
    if (path.startsWith('ratings/user/') && method === 'GET') {
      const userId = path.split('/')[2];
      
      const ratings = await sql`
        SELECT coffee_id, rating, hashtags
        FROM ratings
        WHERE user_id = ${userId}
      `;
      
      // Convert to object format for easy lookup
      const ratingsMap = {};
      ratings.forEach(r => {
        ratingsMap[r.coffee_id] = {
          rating: r.rating,
          hashtags: r.hashtags || []
        };
      });
      
      return response(200, { ratings: ratingsMap });
    }
    
    // Submit Rating
    if (path === 'ratings' && method === 'POST') {
      const { userId, coffeeId, rating, hashtags } = body;
      
      if (!rating || rating < 1 || rating > 5) {
        return response(400, { error: 'Rating must be between 1 and 5' });
      }
      
      // Upsert rating (insert or update if exists)
      const result = await sql`
        INSERT INTO ratings (user_id, coffee_id, rating, hashtags, created_at)
        VALUES (${userId}, ${coffeeId}, ${rating}, ${hashtags || []}, NOW())
        ON CONFLICT (user_id, coffee_id)
        DO UPDATE SET rating = ${rating}, hashtags = ${hashtags || []}, created_at = NOW()
        RETURNING id, user_id, coffee_id, rating, hashtags
      `;
      
      return response(200, { rating: result[0] });
    }
    
    // Default 404
    return response(404, { error: 'Not found' });
    
  } catch (error) {
    console.error('Error:', error);
    return response(500, { error: error.message });
  }
};
