'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Bookmark = {
  id: number
  title: string
  url: string
  created_at: string
}

export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [loading, setLoading] = useState(true)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const fetchBookmarks = async () => {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) setBookmarks(data || [])
      setLoading(false)
    }
    fetchBookmarks()
  }, [])

  const addBookmark = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle || !newUrl) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from('bookmarks')
      .insert([{ title: newTitle, url: newUrl, user_id: user.id }])
      .select()

    if (!error) {
      setBookmarks([data[0], ...bookmarks])
      setNewTitle('')
      setNewUrl('')
    }
  }

  const deleteBookmark = async (id: number) => {
    const { error } = await supabase.from('bookmarks').delete().eq('id', id)
    if (!error) setBookmarks(bookmarks.filter((b) => b.id !== id))
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f172a]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f172a] text-slate-200">
      {/* Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        {/* Header Section */}
        <header className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white">
              My <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Vault</span>
            </h1>
            <p className="mt-2 text-slate-400">Manage your curated digital collection.</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-red-500/20 hover:border-red-500/50"
          >
            Sign Out
          </button>
        </header>

        {/* Floating Input Card */}
        <div className="mb-12 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
          <h2 className="mb-6 text-lg font-semibold text-white">Capture New Bookmark</h2>
          <form onSubmit={addBookmark} className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Title (e.g. GitHub)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#1e293b]/50 p-4 text-white outline-none ring-blue-500/50 transition-all focus:ring-2"
              />
            </div>
            <div className="relative flex-1">
              <input
                type="url"
                placeholder="https://link.com"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#1e293b]/50 p-4 text-white outline-none ring-blue-500/50 transition-all focus:ring-2"
              />
            </div>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Add to Vault
            </button>
          </form>
        </div>

        {/* Bookmarks Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {bookmarks.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-slate-800/50 p-6 text-slate-600">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              </div>
              <p className="text-slate-500 text-lg">Your vault is currently empty.</p>
            </div>
          ) : (
            bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-blue-500/30 hover:bg-white/10 hover:shadow-2xl"
              >
                {/* Visual Flair: Hover Glow */}
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl transition-opacity opacity-0 group-hover:opacity-100" />
                
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h3 className="text-xl font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                      {bookmark.title}
                    </h3>
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block text-sm text-slate-400 truncate hover:text-blue-300 transition-colors"
                    >
                      {bookmark.url.replace('https://', '')}
                    </a>
                  </div>
                  
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                      Added {new Date(bookmark.created_at).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => deleteBookmark(bookmark.id)}
                      className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-500 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}