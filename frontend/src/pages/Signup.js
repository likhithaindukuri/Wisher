import { useSignup } from "../hooks/useSignup";
import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup(email, password);
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-xl shadow-slate-200/80">
        <div className="pointer-events-none absolute -left-10 top-[-120px] h-60 w-60 rounded-full bg-fuchsia-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-[-140px] h-64 w-64 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="relative grid gap-10 p-6 md:grid-cols-[1.1fr,0.9fr] md:p-10">
          <div className="flex flex-col justify-center space-y-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Wisher · Create your account
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                Start sending{" "}
                <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
                  unforgettable wishes
                </span>
              </h1>
              <p className="text-sm text-slate-500 md:text-[13px]">
                In just a few clicks you can schedule birthday, anniversary, and
                celebration emails that arrive exactly when they should.
              </p>
            </div>

            <div className="mt-1 grid gap-3 text-xs text-slate-500 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-fuchsia-500/20 text-primary">
                  <span className="material-symbols-outlined text-[18px]">
                    favorite
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">
                    Make every wish special
                  </p>
                  <p className="mt-0.5">
                    Write once, schedule, and let Wisher deliver heartfelt notes
                    right on time.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/10 to-sky-500/20 text-emerald-600">
                  <span className="material-symbols-outlined text-[18px]">
                    schedule_send
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-slate-800">
                    Set it and relax
                  </p>
                  <p className="mt-0.5">
                    Update or cancel any wish before it is sent—full control,
                    zero stress.
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden rounded-2xl border border-dashed border-primary/30 bg-gradient-to-r from-primary/5 via-fuchsia-500/5 to-sky-400/5 p-3 text-xs text-slate-700 sm:flex sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/80 text-[16px] font-semibold text-primary shadow-sm">
                  🎉
                </span>
                <div>
                  <p className="font-semibold">Perfect for busy wishers</p>
                  <p>Plan ahead once and Wisher remembers every important day.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <form
              className="w-full space-y-4 rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-sm md:p-5"
              onSubmit={handleSubmit}
            >
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
                  placeholder="Use a strong password"
                  autoComplete="new-password"
                />
                <p className="mt-1 text-[11px] text-slate-500">
                  Must include uppercase, lowercase, number, and symbol.
                </p>
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
                {isLoading ? "Creating account..." : "Sign up"}
              </button>

              <p className="pt-2 text-center text-xs text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-primary hover:text-fuchsia-400"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

