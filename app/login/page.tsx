"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Loader2, LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    window.location.href = "/dashboard";
  }

  async function handleGoogleLogin() {
    setError("");
    setGoogleLoading(true);

    await signIn("google", {
      callbackUrl: "/dashboard",
    });
  }

  return (
    <section className="section min-h-[75vh]">
      <div className="mx-auto max-w-md">
        <div className="glass rounded-3xl p-8 md:p-10">
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-[.25em] text-cyan-300">
              Member Access
            </div>

            <h1 className="mt-3 text-3xl font-bold">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Sign in to access your SynaptIQ portal.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-semibold transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <span className="text-lg font-bold">G</span>
            )}

            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-slate-600">
            <span className="h-px flex-1 bg-white/10" />
            OR
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-300/40"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-cyan-300/40"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-slate-500 transition hover:text-cyan-300"
            >
              ← Back to SynaptIQ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}