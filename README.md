# Drink My Drink - Coffee Rating App

A mobile-friendly coffee rating application with user authentication, built with Netlify Functions and Neon PostgreSQL.

## Features

- ☕ User registration and login
- ⭐ Rate popular coffee drinks (1-5 stars)
- 📝 Create your own custom coffee recipes
- ✏️ Edit your coffee creations
- #️⃣ Add hashtags to coffees and ratings
- 💾 Persistent data storage with Neon PostgreSQL

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Netlify Serverless Functions
- **Database**: Neon PostgreSQL (Serverless Postgres)
- **Hosting**: Netlify

---

## 🚀 Deployment Instructions

### Step 1: Set Up Neon Database

1. **Create a Neon Account**
   - Go to [neon.tech](https://neon.tech)
   - Sign up for a free account

2. **Create a New Project**
   - Click "Create Project"
   - Choose a name (e.g., "drink-my-drink")
   - Select a region close to you
   - Click "Create Project"

3. **Get Your Database URL**
   - After creation, you'll see a connection string
   - It looks like: `postgresql://user:password@host/database?sslmode=require`
   - **Copy this URL** - you'll need it soon!

4. **Run the Database Schema**
   - In your Neon dashboard, go to "SQL Editor"
   - Copy the contents of `schema.sql` from this project
   - Paste it into the SQL Editor
   - Click "Run" to create all the tables

---

### Step 2: Deploy to Netlify

#### Option A: Deploy via Netlify UI (Easiest)

1. **Create GitHub Repository**
   - Go to [github.com](https://github.com) and create a new repository
   - Upload all project files to the repository

2. **Connect to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `public`
   - Functions directory: `netlify/functions`

4. **Add Environment Variable**
   - Go to "Site settings" → "Environment variables"
   - Click "Add a variable"
   - Key: `DATABASE_URL`
   - Value: Your Neon connection string (from Step 1.3)
   - Click "Save"

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment to complete
   - Your site will be live at a Netlify URL!

#### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize the Site**
   ```bash
   cd drink-my-drink-app
   netlify init
   ```

4. **Set Environment Variable**
   ```bash
   netlify env:set DATABASE_URL "your-neon-connection-string-here"
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

---

### Step 3: Test Your App

1. Visit your Netlify URL
2. Click "Sign Up" and create an account
3. Try rating a coffee
4. Create your own coffee
5. Add hashtags!

---

## 📁 Project Structure

```
drink-my-drink-app/
├── netlify/
│   └── functions/
│       └── api.js          # Serverless API endpoints
├── public/
│   ├── index.html          # Main app interface
│   └── api-config.js       # API configuration
├── netlify.toml            # Netlify configuration
├── package.json            # Dependencies
├── schema.sql              # Database schema
└── README.md               # This file
```

---

## 🔧 Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   Create a `.env` file:
   ```
   DATABASE_URL=your-neon-connection-string
   ```

3. **Run Locally**
   ```bash
   netlify dev
   ```

4. **Open Browser**
   - Go to `http://localhost:8888`

---

## 📊 Database Schema

### Users Table
- `id` - Primary key
- `username` - Unique username
- `password_hash` - Hashed password (bcrypt)
- `created_at` - Timestamp

### Coffees Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `name` - Coffee name
- `location` - Optional location
- `directions` - Recipe/instructions
- `hashtags` - Array of hashtag strings
- `created_at` - Timestamp

### Ratings Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `coffee_id` - ID of rated coffee (1-4 for popular, or custom ID)
- `rating` - 1-5 stars
- `hashtags` - User's personal hashtags for this rating
- `created_at` - Timestamp

---

## 🔐 Security Notes

- Passwords are hashed with bcrypt (10 rounds)
- Database connection uses SSL
- CORS is configured for API endpoints
- Input validation on both frontend and backend

---

## API Endpoints

### Authentication
- `POST /api/register` - Create new user
- `POST /api/login` - Login user

### Coffees
- `GET /api/coffees/user/:userId` - Get user's coffees
- `POST /api/coffees` - Create new coffee
- `PUT /api/coffees/:id` - Update coffee
- `DELETE /api/coffees/:id` - Delete coffee

### Ratings
- `GET /api/ratings/user/:userId` - Get user's ratings
- `POST /api/ratings` - Submit/update rating

---

## 🐛 Troubleshooting

**Database connection errors:**
- Verify your DATABASE_URL is correct in Netlify environment variables
- Make sure you ran the schema.sql to create tables
- Check that Neon database is active (free tier may pause after inactivity)

**Login not working:**
- Open browser console (F12) to see error messages
- Verify API endpoints are working: `/api/login` should return JSON

**Hashtags not saving:**
- Check browser console for errors
- Verify hashtags field is being sent in API requests

---

## 📝 License

MIT License - Feel free to use this project however you like!

---

## 🎉 You're Done!

Your coffee rating app is now live with a real database! Share the URL with friends and start rating coffee together! ☕

Questions? Check the Netlify logs or Neon dashboard for detailed error messages.
