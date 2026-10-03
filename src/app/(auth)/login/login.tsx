"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import AuthFormShell from "@/components/auth/auth-form-shell";
import { ErrorBanner } from "@/components/auth/fields";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  // Google Login
  async function handleGoogleSignIn() {
    setError("");
    setGoogleLoading(true);

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("Google sign-in error:", err);

      setGoogleLoading(false);
      setError("Unable to sign in with Google. Please try again.");
    }
  }

  // Email + Password Login
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        rememberMe,
      });

      if (error) {
        setError(
          error.message || "Invalid email or password. Please try again.",
        );
        return;
      }

      if (data) {
        // Sync guest orders after successful login
        try {
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/orders/sync-guest-orders`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
        } catch (syncError) {
          console.error("Guest order sync failed:", syncError);
        }

        // Go to homepage
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <AuthFormShell
        eyebrow="Welcome back"
        headline="Pick up right where the last deal left off."
        body="Your pipeline, notes, and contacts are exactly where you left them."
        title="Login"
        subtitle=""
        footer={null}
      >
        {/* Error */}
        {error && <ErrorBanner message={error} />}

        {/* Email Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              placeholder="username or email address"
              className="w-full rounded-full bg-[#f1f3f4] px-5 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-[#ff5c47]"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              placeholder="Password"
              className="w-full rounded-full bg-[#f1f3f4] px-5 py-3 pr-12 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-[#ff5c47]"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a9.04 9.04 0 012.122-.363c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21M3 3l18 18"
                />
              </svg>
            </span>
          </div>

          {/* Remember Me & Lost Password */}
          <div className="flex items-center justify-between pt-1 text-xs text-gray-500">
            <label className="flex cursor-pointer items-center gap-2 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#ff5c47] focus:ring-[#ff5c47]"
              />
              <span>Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="text-gray-600 hover:underline"
            >
              Lost password?
            </Link>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#ff5c47] py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#e04f3b] disabled:opacity-50"
            >
              {loading ? "Logging in…" : "LOG IN"}
            </button>

            <Link
              href="/register"
              className="block w-full rounded-full bg-[#111619] py-3 text-center text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black"
            >
              CREATE ACCOUNT
            </Link>
          </div>
        </form>

        {/* Social Login */}
        <div className="mt-8 text-center">
          <div className="relative mb-6 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <span className="relative bg-white px-3 text-xs text-gray-400">
              or Continue With
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f3f4] text-gray-700 transition hover:bg-gray-200"
              title="Continue with Google"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.545,6.477,2.545,12s4.476,10,10,10c5.768,0,9.601-4.057,9.601-9.767c0-0.652-0.061-1.298-0.169-1.994H12.545z"
                />
              </svg>
            </button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f3f4] text-gray-700 transition hover:bg-gray-200"
              title="Continue with Apple"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.16-1.9-14.49-6.07-3.23-2.61-7.15-7.2-11.75-13.78-6.19-8.83-11.16-18.89-14.91-30.17-3.75-11.28-5.63-22.17-5.63-32.68 0-14.28 3.59-26.04 10.77-35.29 7.18-9.25 16.22-13.98 27.12-14.19 4.34 0 9.38 1.13 15.12 3.39 5.74 2.26 9.87 3.39 12.39 3.39 2.12 0 6.34-1.18 12.66-3.54 6.32-2.36 11.53-3.41 15.63-3.15 11.83.63 21.32 4.96 28.48 13.01-10.37 6.27-15.42 15.11-15.15 26.53.27 8.93 3.69 16.4 10.26 22.42 6.57 6.02 14.51 9.4 23.83 10.15-2.28 6.83-5.07 13.59-8.37 20.28zM119.22 31.84c0-6.83 2.51-13.43 7.54-19.8 5.03-6.37 11.31-10.32 18.84-11.85.54 2.02.81 4.09.81 6.2 0 6.94-2.63 13.62-7.89 20.04-5.26 6.42-11.59 10.22-18.99 11.41-.09-1.92-.31-3.92-.31-6z" />
              </svg>
            </button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1f3f4] text-gray-700 transition hover:bg-gray-200"
              title="Continue with Facebook"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
          </div>
        </div>
      </AuthFormShell>
    </div>
  );
}