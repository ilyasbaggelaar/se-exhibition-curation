# se-exhibition-curation

A full-stack web app for curating and browsing artworks from institutions like The Met Museum and The Art Institute of Chicago. Users can filter, search, and favorite pieces based on time periods, artists, and geography.

**Live App:** [https://artifyexhibition.netlify.app](https://artifyexhibition.netlify.app)

---

##  Tech Stack

| Layer       | Tech Used                         |
|------------|-----------------------------------|
| Frontend   | React, Vite, TypeScript, Tailwind |
| Backend    | Node.js, TypeScript               |
| Auth + DB  | Supabase                          |
| APIs       | The Met Collection, Art Institute of Chicago |

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repo

```bash
git clone https://github.com/ilyasbaggelaar/se-exhibition-curation.git
cd se-exhibition-curation

```
### 2. Env Setup

Create a .env file in the be/ directory with the following:

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=3000

Use Supabase dashboard → Project Settings → API → copy keys.

(You will have to create a Supabase project.)

### 3. Build neccesary project plug ins

cd be
npm install
tsc

### 4. Run Setup Script

cd be
npx tsx scripts/setup-env.ts

If all keys are present, it will output "success".

### 5. Seed the DB (optional if you want to use login)

npx tsx scripts/seed-db.ts

testUser login information:
email: testemail123@gmail.com
Password: test0123



### 6. START THE APP!

(If you're still CD on BE)
./scripts/start-dev.sh



# Additional Information

Hosting
Frontend (Netlify, Vercel, etc.)
Point the deploy to the fe/ folder

Use npm run build for production

Set any necessary environment variables for frontend (optional)

Backend
Currently local — could be hosted with:

Render

Railway

Fly.io

You’ll need to expose the backend API if needed and securely store Supabase keys, but considering backend is also hosted on Supabase, it should be reccomended to stick with Supabase for if hosting is wanted.
