# 🔧 Common Errors & Solutions

This guide shows you EXACTLY what errors look like and how to fix them.

---

## Error 1: "Username already exists"

**What you see:**
- Red error message when trying to sign up
- Message says: "Username already exists"

**What it means:**
- Someone (probably you!) already created an account with that username

**How to fix:**
1. Try a different username
2. OR try logging in instead of signing up
3. If you forgot password, use a new username (no password reset yet)

**✅ Fixed!**

---

## Error 2: "Invalid credentials" when logging in

**What you see:**
- Red error message when trying to log in
- Message says: "Invalid credentials"

**What it means:**
- Wrong username OR wrong password
- OR that account doesn't exist

**How to fix:**
1. Double-check your username (no extra spaces!)
2. Double-check your password (case-sensitive!)
3. Try signing up if you haven't created an account yet

**✅ Fixed!**

---

## Error 3: Can't click anything / buttons don't work

**What you see:**
- Buttons exist but nothing happens when you click
- No error messages

**How to fix:**
1. Press **F12** on your keyboard (opens Developer Tools)
2. Click the **"Console"** tab
3. Look for RED error messages
4. Take a screenshot and read what it says

**Common causes:**
- JavaScript error in the code
- File didn't upload correctly
- Browser blocking something

**Solution:**
1. Try refreshing the page (Ctrl+R or Cmd+R)
2. Try a different browser (Chrome, Firefox)
3. Check that ALL files uploaded to GitHub
4. Check Netlify deploy logs for errors

**✅ Try these steps**

---

## Error 4: "Failed to fetch" or "Network error"

**What you see:**
- Error in browser console (F12)
- Says something like:
  - "Failed to fetch"
  - "NetworkError"
  - "ERR_CONNECTION_REFUSED"

**What it means:**
- Can't connect to your Netlify Functions (API)
- Database isn't connected
- Environment variable missing

**How to fix:**

### Step 1: Check DATABASE_URL is set

1. Go to Netlify
2. Click your site
3. Click "Site configuration"
4. Click "Environment variables"
5. **Look for:** `DATABASE_URL`

**If it's MISSING:**
1. Click "Add a variable"
2. Key: `DATABASE_URL`
3. Value: Your Neon connection string
4. Click Save
5. Go to "Deploys" → Click "Trigger deploy"
6. Wait 1-2 minutes
7. Try again!

**If it's THERE but still not working:**
1. Check the value is correct
2. Should look like: `postgresql://user:pass@host.neon.tech/db?sslmode=require`
3. Make sure it ends with `?sslmode=require`
4. Try redeploying

**✅ Fixed!**

---

## Error 5: "This site can't be reached" or page won't load

**What you see:**
- Blank white page
- OR "This site can't be reached"
- OR "404 - Page not found"

**What it means:**
- Deployment failed
- URL is wrong
- Site isn't published yet

**How to fix:**

1. **Check your URL:**
   - Should be: `something.netlify.app`
   - NOT: `github.com/...`
   - NOT: `localhost:...`

2. **Check deployment status:**
   - Go to Netlify
   - Look for deploy status
   - Should say "Published" with green checkmark

3. **If deploy FAILED:**
   - Click on the failed deploy
   - Read the error log
   - Common issues:
     - Missing package.json
     - Missing netlify.toml
     - Syntax error in code

4. **Re-deploy:**
   - In Netlify, click "Deploys"
   - Click "Trigger deploy"
   - Select "Deploy site"
   - Wait 1-2 minutes

**✅ Check these!**

---

## Error 6: Schema.sql errors in Neon

**What you see when running schema.sql:**
- Red error text
- Says something like:
  - "syntax error at or near..."
  - "relation already exists"
  - "column does not exist"

**How to fix:**

### If it says "relation already exists":
- This means the table is already created
- **It's okay!** Your database is set up
- Skip this step

### If it says "syntax error":
1. Make sure you copied ALL of schema.sql
2. From the very first line to the very last line
3. No extra characters at the beginning
4. Try copying again
5. Run it again

### Start fresh (nuclear option):
1. In Neon, go to Settings
2. Delete your database
3. Create a new one
4. Run schema.sql again

**✅ Try again!**

---

## Error 7: Build failed in Netlify

**What you see:**
- Netlify says "Deploy failed"
- Red X next to your deploy

**How to find out why:**

1. Click on the failed deploy
2. Scroll through the log
3. Look for error messages (usually in red)

**Common errors and fixes:**

### "Cannot find module"
- A file is missing
- Check that all files uploaded to GitHub
- Especially: package.json, netlify.toml

### "Command not found: npm"
- This shouldn't happen with our setup
- Try redeploying

### "Build script is missing"
- package.json is missing or corrupt
- Re-upload package.json from project folder

**How to re-deploy:**
1. Fix the issue (upload missing file to GitHub)
2. Go to Netlify → Deploys
3. Click "Trigger deploy"
4. Watch it succeed!

**✅ Fixed!**

---

## Error 8: Hashtags not showing up

**What you see:**
- Created coffee with hashtags
- OR rated coffee with hashtags
- But hashtags don't appear

**How to fix:**

1. **Check your hashtag format:**
   - ✅ Correct: `#coffee #latte` or just `coffee latte`
   - ✅ Correct: `smooth bold favorite`
   - ❌ Wrong: `coffee,latte,smooth` (no commas!)

2. **Check browser console:**
   - Press F12
   - Look for JavaScript errors
   - Hashtags might not be saving

3. **Try again:**
   - Create a new coffee
   - Add hashtags: `test tags here`
   - Click save
   - Check if they appear

**✅ Try this!**

---

## Error 9: Changes I made aren't showing up

**What you see:**
- Updated a file on GitHub
- But website still shows old version

**What it means:**
- Netlify needs to redeploy
- OR browser is caching old version

**How to fix:**

### Trigger a new deploy:
1. Go to Netlify
2. Click "Deploys"
3. Click "Trigger deploy" → "Deploy site"
4. Wait 1-2 minutes
5. Check your site

### Clear browser cache:
1. Hold **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
2. This "hard refreshes" the page
3. OR try in an incognito/private window

**✅ Should work now!**

---

## Error 10: Database "went to sleep" / Connection timeout

**What you see:**
- Error says: "Connection timeout"
- OR: "Database unavailable"
- App was working before, now it's not

**What it means:**
- Neon free tier databases sleep after inactivity
- Need to "wake up" the database

**How to fix:**

1. Go to your Neon dashboard
2. Click on your database project
3. Just viewing it "wakes it up"
4. Wait 30 seconds
5. Go back to your app
6. Try logging in again

**To prevent this:**
- Neon free tier sleeps after 5 minutes of inactivity
- Using the app keeps it awake
- This is normal for free tier!

**✅ Just wake it up!**

---

## 🆘 Still Having Issues?

### Step-by-Step Debugging:

1. **Check what's working:**
   - [ ] GitHub has all my files
   - [ ] Neon database has 3 tables
   - [ ] Netlify deploy is "Published"
   - [ ] DATABASE_URL is set in Netlify

2. **Check for errors:**
   - [ ] Browser console (F12) - any red errors?
   - [ ] Netlify deploy logs - any failures?
   - [ ] Neon query logs - any connection issues?

3. **Try the basics:**
   - [ ] Hard refresh (Ctrl+Shift+R)
   - [ ] Try different browser
   - [ ] Try incognito mode
   - [ ] Clear browser cache

4. **Re-deploy everything:**
   - [ ] Check GitHub files
   - [ ] Wake up Neon database
   - [ ] Trigger new Netlify deploy
   - [ ] Wait 2-3 minutes
   - [ ] Try again

---

## 📞 Getting Help

**When asking for help, provide:**

1. **What you were trying to do:**
   - "I was trying to create an account"

2. **What happened instead:**
   - "I got an error message"

3. **The exact error message:**
   - Copy and paste it!
   - OR take a screenshot

4. **What you've already tried:**
   - "I checked DATABASE_URL and redeployed"

5. **Screenshots of:**
   - The error (if visible)
   - Browser console (F12)
   - Netlify deploy log
   - Neon database tables

**This helps anyone help you faster!**

---

## 💡 Pro Tips

1. **Read error messages carefully** - they usually tell you what's wrong
2. **Google the error** - someone else has had it before
3. **Check one thing at a time** - don't change everything at once
4. **Take breaks** - fresh eyes see solutions
5. **Save your work** - commit to GitHub often

---

## ✅ Error Checklist

When something goes wrong, check these IN ORDER:

1. [ ] Are all files on GitHub?
2. [ ] Did Netlify deploy succeed?
3. [ ] Is DATABASE_URL set in Netlify?
4. [ ] Are there 3 tables in Neon?
5. [ ] Is Neon database awake?
6. [ ] Any errors in browser console?
7. [ ] Tried hard refresh (Ctrl+Shift+R)?

**One of these is usually the problem!**

---

## 🎓 Learning From Errors

**Every developer:**
- Gets errors ALL THE TIME
- Googles things constantly  
- Debugs step by step
- Learns by fixing problems

**You're not doing anything wrong - this is normal!**

Keep trying. You'll get it! 💪

---

**Remember:** The error message is trying to help you. Read it carefully!
