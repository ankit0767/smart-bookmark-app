'use client'

import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        // This forces Google to show the account picker every time
        queryParams: {
          prompt: 'select_account',
        },
      },
    })

    if (error) {
      alert('Error logging in')
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* Animated Gradient Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]" />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* The Card with Glassmorphism */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            {/* Simple Logo Icon */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30">
              <svg 
                className="h-8 w-8 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Smart<span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Bookmark</span>
            </h1>
            <p className="mt-3 text-sm text-slate-400">
              Your private sanctuary for digital discovery.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-white px-4 py-4 font-semibold text-slate-900 transition-all hover:bg-slate-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-70"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
              ) : (
                <>
                  {/* Google Icon SVG */}
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
            
            <div className="pt-4 text-center">
              <span className="text-xs uppercase tracking-widest text-slate-500">
                Secure Cloud Storage
              </span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-8 text-center text-sm text-slate-500">
          No password required. Fast and secure.
        </p>
      </div>
    </div>
  )
}