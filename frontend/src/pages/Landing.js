import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-4 py-12 text-center md:py-20">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Never miss a special moment again
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
          Schedule heartfelt wishes
          <br />
          <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
            that arrive on time
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 md:text-xl">
          Wisher makes it effortless to send personalized messages via email at
          the perfect moment. Never forget a birthday, anniversary, or special
          occasion again.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/signup"
            className="rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-300/40 transition hover:-translate-y-0.5 hover:shadow-fuchsia-400/60 md:px-8 md:py-3.5 md:text-base"
          >
            Get started free
          </Link>
          <Link
            to="/login"
            className="rounded-xl border-2 border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary md:px-8 md:py-3.5 md:text-base"
          >
            Log in
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Everything you need to stay connected
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Simple, secure, and reliable—Wisher helps you make every moment
            count.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-fuchsia-500/10">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              Effortless Wishing
            </h3>
            <p className="text-sm text-slate-600">
              Schedule personalized messages to be sent via email at specific
              times with just a few clicks.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
              <svg
                className="h-6 w-6 text-emerald-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              Never Miss an Occasion
            </h3>
            <p className="text-sm text-slate-600">
              Ensure your loved ones receive your wishes on time, every time,
              eliminating the risk of forgetting important dates.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              Streamlined Management
            </h3>
            <p className="text-sm text-slate-600">
              Manage recipients' email addresses, craft personalized messages,
              and schedule wishes all in one convenient platform.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10">
              <svg
                className="h-6 w-6 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              Secure & Reliable
            </h3>
            <p className="text-sm text-slate-600">
              Your data and wishes are kept safe and secure, allowing you to
              send heartfelt messages with peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            How it works
          </h2>
          <p className="mx-auto max-w-2xl text-slate-600">
            Get started in minutes and never miss another special moment.
          </p>
        </div>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
            <div className="flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-2xl font-bold text-white shadow-lg shadow-fuchsia-300/40">
                1
              </div>
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Create your account
              </h3>
              <p className="text-slate-600">
                Sign up with your email in seconds. No credit card required, no
                complicated setup—just simple, secure authentication.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
            <div className="flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-2xl font-bold text-white shadow-lg shadow-emerald-300/40">
                2
              </div>
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Schedule your wish
              </h3>
              <p className="text-slate-600">
                Choose the recipient, write your heartfelt message, pick the
                occasion type, and set the exact date and time you want it
                delivered.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-8">
            <div className="flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-2xl font-bold text-white shadow-lg shadow-blue-300/40">
                3
              </div>
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-semibold text-slate-900">
                Relax and enjoy
              </h3>
              <p className="text-slate-600">
                Wisher handles the rest. Your message will be automatically sent
                via email at the scheduled time, making someone's day without you
                having to remember.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-primary/5 via-fuchsia-500/5 to-primary/5 p-8 text-center shadow-lg md:p-12">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Ready to make someone's day?
          </h2>
          <p className="mb-8 mx-auto max-w-xl text-lg text-slate-600">
            Join Wisher today and start scheduling heartfelt wishes that arrive
            exactly when they're meant to.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/signup"
              className="rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-fuchsia-300/40 transition hover:-translate-y-0.5 hover:shadow-fuchsia-400/60"
            >
              Get started free
            </Link>
            <Link
              to="/login"
              className="rounded-xl border-2 border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

