import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/80">
        <div className="pointer-events-none absolute inset-x-16 -top-24 h-40 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Create your Wisher account
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Schedule heartfelt wishes so they always arrive on time.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-primary/30 transition focus:border-primary focus:ring-2"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none ring-primary/30 transition focus:border-primary focus:ring-2"
                placeholder="Use a strong password"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Must include uppercase, lowercase, number, and symbol.
              </p>
            </div>

            {error && (
              <div className="rounded-lg border border-red-500/60 bg-red-50 px-3 py-2 text-xs text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-fuchsia-500/30 transition hover:-translate-y-0.5 hover:shadow-fuchsia-500/60 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <p className="pt-1 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-fuchsia-400"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

