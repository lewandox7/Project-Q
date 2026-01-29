# 🎓 Project Q - Setup Guide

## Quick Start

### 1️⃣ Database Setup (Supabase)

1. Login ke [supabase.com](https://supabase.com)
2. Buka project Anda
3. Go to **SQL Editor** (left menu)
4. Open `database.sql` file
5. Copy seluruh isi file
6. Paste di SQL Editor
7. Click **Execute** (green button)

**Result:**
- ✅ `custom_users` table created
- ✅ `quizzes` table created
- ✅ `questions` table created
- ✅ `quiz_attempts` table created
- ✅ Seed users inserted:
  - User: `user` / Pass: `user123` (User role)
  - Admin: `admin` / Pass: `admin123` (Admin role)

### 2️⃣ Update .env.local

File `.env.local` di root project:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get credentials dari Supabase:
1. Go to **Settings > API**
2. Copy `Project URL`
3. Copy `anon` key

### 3️⃣ Run Development Server

```bash
npm run dev
```

Open: http://localhost:3000

### 4️⃣ Test Login

**User Login:**
- Username: `user`
- Password: `user123`
- Role: User

**Admin Login:**
- Username: `admin`
- Password: `admin123`
- Role: Admin

---

## Project Structure

```
Project Q/
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── LoginPage.tsx     # Login form
│   ├── Navbar.tsx        # Navigation
│   ├── UserDashboard.tsx # User page
│   └── AdminDashboard.tsx # Admin page
├── lib/
│   └── supabase.ts       # Supabase client
├── database.sql          # Database schema
├── .env.local            # Environment variables
└── package.json
```

---

## Database Schema

### custom_users
```sql
- id (UUID, Primary Key)
- username (TEXT, Unique)
- password (TEXT)
- role ('admin' | 'user')
- created_at (TIMESTAMP)
```

### quizzes
```sql
- id (UUID, Primary Key)
- title (TEXT)
- description (TEXT)
- created_by (UUID, Foreign Key → custom_users)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### questions
```sql
- id (UUID, Primary Key)
- quiz_id (UUID, Foreign Key → quizzes)
- question_text (TEXT)
- options (TEXT[])
- correct_answer (TEXT)
- order (INT)
- created_at (TIMESTAMP)
```

### quiz_attempts
```sql
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key → custom_users)
- quiz_id (UUID, Foreign Key → quizzes)
- score (INT)
- total_questions (INT)
- completed_at (TIMESTAMP)
- created_at (TIMESTAMP)
```

---

## Login & Signup System

### Username & Password Only
- ✅ Simple username/password authentication
- ✅ Stored in `custom_users` table
- ✅ No password hashing (for development)
- ✅ Role-based access (admin/user)
- ✅ Signup page creates account and logs in automatically

### How It Works
1. User pilih **Login** atau **Buat Akun**
2. Saat Signup, user memilih role (User/Admin)
3. Data disimpan ke `custom_users` dengan role yang dipilih
4. Setelah Signup, user langsung masuk dan role tersimpan permanen
5. Login berikutnya memakai username + password + role

---

## Design

- 🎨 Modern minimalist design
- 🔵 Blue (#3b82f6) & White color scheme
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast & lightweight
- 🎯 Clean UI with Tailwind CSS

---

## Add Data Manually (Supabase)

### Add New User

In Supabase **SQL Editor**:

```sql
INSERT INTO custom_users (username, password, role)
VALUES ('newuser', 'newpass123', 'user');
```

### Add New Admin

```sql
INSERT INTO custom_users (username, password, role)
VALUES ('newadmin', 'adminpass123', 'admin');
```

### Add New Quiz

```sql
INSERT INTO quizzes (title, description, created_by)
VALUES (
  'Math Quiz',
  'Basic Mathematics Questions',
  (SELECT id FROM custom_users WHERE username = 'admin1')
);
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Login fails | Check .env.local credentials |
| Database error | Run database.sql again in SQL Editor |
| No quizzes shown | Create quiz as admin first |
| Port 3000 in use | Try `npm run dev` (auto-change port) |

---

## Build for Production

```bash
npm run build
npm run start
```

Deploy to **Vercel**:
1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel
4. Deploy!

---

**Happy Quizzing! 🎉**
