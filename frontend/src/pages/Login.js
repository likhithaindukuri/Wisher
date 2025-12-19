import { useLogin } from "../hooks/useLogin";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="pointer-events-none absolute -left-10 -top-20 h-40 w-40 rounded-full bg-fuchsia-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-[-80px] h-40 w-40 rounded-full bg-sky-300/25 blur-3xl" />

        <div className="relative rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/80 sm:p-8">
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Welcome back
            </p>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Sign in to{" "}
              <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
                Wisher
              </span>
            </h1>
            <p className="mt-2 text-xs text-slate-500">
              Access your saved wishes and keep every celebration on time.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-600">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none ring-primary/20 transition focus:border-primary focus:ring-2"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-slate-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none ring-primary/20 transition focus:border-primary focus:ring-2"
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/60 bg-red-50 px-3.5 py-2 text-xs text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-1 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-fuchsia-500/30 transition hover:-translate-y-0.5 hover:shadow-fuchsia-500/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <p className="pt-2 text-center text-xs text-slate-500">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-primary hover:text-fuchsia-400"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
