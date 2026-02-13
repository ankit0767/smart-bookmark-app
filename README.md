# 🚀 Smart Bookmark Vault

A premium, full-stack web application designed to help users securely store and manage their digital discoveries. Built with **Next.js 15**, **Supabase**, and **Tailwind CSS**.

## 🌟 Features
- **Google OAuth Integration**: Secure, passwordless login.
- **Real-time CRUD**: Add and delete bookmarks with instant UI updates.
- **Row-Level Security (RLS)**: Each user can only access their own private data.
- **Premium UI/UX**: Modern dark-mode aesthetic with glassmorphism and mesh gradients.
- **Middleware Protected**: Automatic redirection for unauthenticated users.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database & Auth**: Supabase
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

---

## 🧠 Challenges & Solutions

During the development of this project, I encountered several technical hurdles. Here is how I approached and solved them:

### 1. Row-Level Security (RLS) Violations
**Problem:** Initially, when attempting to add a bookmark, the database returned a `new row violates row-level security policy` error.
**Solution:** I realized the Supabase policy required a `user_id` to match the authenticated user's ID. I updated the frontend logic to fetch the active session's `user.id` using the Supabase client and explicitly include it in the `insert` payload.

### 2. OAuth Configuration & Callback Logic
**Problem:** Setting up Google OAuth required precise matching of redirect URIs between Google Cloud Console and Supabase.
**Solution:** I configured an internal `/auth/callback` route using Next.js Route Handlers to exchange the temporary auth code for a permanent session, ensuring a seamless handshake between the provider and the application.

### 3. State Management vs. Database Sync
**Problem:** Ensuring the UI updated instantly without requiring a full page refresh after adding or deleting a bookmark.
**Solution:** I implemented optimistic-style state updates using React's `useState` hook, filtering or spreading the local state array immediately after a successful database response.

---
## 🚀 How to Run Locally

1. **Clone the repository**:
   `git clone https://github.com/ankit0767/smart-bookmark-app.git`

2. **Install dependencies**:
   `npm install`

3. **Set up environment variables**:
   - Rename `.env.example` to `.env.local`.
   - Add your [Supabase](https://supabase.com) project URL and Anon Key.

4. **Run the development server**:
   `npm run dev`