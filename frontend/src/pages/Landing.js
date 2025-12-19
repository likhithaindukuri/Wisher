import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWishesContext } from "../hooks/useWishesContext";

const Landing = () => {
  const { user } = useAuthContext();
  const { wishes, dispatch } = useWishesContext();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchWishes = async () => {
      if (!user) {
        return;
      }

      const response = await fetch(`${API_URL}/api/wishes`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        const sortedWishes = json.sort(
          (first, second) => new Date(first.date) - new Date(second.date),
        );
        dispatch({ type: "SET_WISHES", payload: sortedWishes });
      }
    };

    if (user && (!wishes || wishes.length === 0)) {
      fetchWishes();
    }
  }, [dispatch, user, wishes]);

  const getWishDateTime = (wish) => {
    if (!wish?.date) {
      return null;
    }
    const baseDate = new Date(wish.date);

    if (Number.isNaN(baseDate.getTime())) {
      return null;
    }

    if (wish?.time) {
      const [hours, minutes] = wish.time.split(":");
      baseDate.setHours(Number(hours) || 0, Number(minutes) || 0, 0, 0);
    }

    return baseDate;
  };

  const now = new Date();
  const upcomingWishes = (wishes || []).filter((wish) => {
    const wishDateTime = getWishDateTime(wish);
    return wishDateTime && wishDateTime >= now;
  });
  const nextUpcomingWish =
    upcomingWishes && upcomingWishes.length > 0 ? upcomingWishes[0] : null;

  const wishesThisWeekCount = upcomingWishes.filter((wish) => {
    const wishDateTime = getWishDateTime(wish);
    if (!wishDateTime) {
      return false;
    }

    const differenceInDays =
      (wishDateTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

    return differenceInDays >= 0 && differenceInDays < 7;
  }).length;

  const formatDate = (value) => {
    if (!value) {
      return "";
    }
    const date = new Date(value);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  };

  const formatTime = (time) => {
    if (!time) {
      return "";
    }
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-72 bg-gradient-to-b from-primary/10 via-fuchsia-200/10 to-transparent blur-3xl" />

        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div className="text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Your simple wishing assistant
            </p>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
              Remember every{" "}
              <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
                special day
              </span>
              .
            </h1>
            <p className="mb-6 max-w-md text-sm text-slate-600 md:text-[15px]">
              Wisher lets you write an email once and send it automatically on the
              date and time you choose.
            </p>

            <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200">
                <span className="text-[13px]">🎂</span>
                <span>Birthdays and anniversaries</span>
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200">
                <span className="text-[13px]">⏰</span>
                <span>Set once, Wisher remembers</span>
              </span>
            </div>

            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              {user ? (
                <Link
                  to="/home"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-300/40 transition hover:-translate-y-0.5 hover:shadow-fuchsia-400/60 sm:w-auto"
                >
                  Add a new wish
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-300/40 transition hover:-translate-y-0.5 hover:shadow-fuchsia-400/60 sm:w-auto"
                  >
                    Get started free
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary sm:w-auto"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-fuchsia-300/40 blur-2xl" />
              <div className="pointer-events-none absolute -right-12 bottom-[-32px] h-40 w-40 rounded-full bg-sky-300/40 blur-3xl" />

              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/5 via-fuchsia-100/40 to-sky-100/50 shadow-xl shadow-slate-200/80">
                {/* Soft orbits */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/25 animate-pulse" />
                  <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/25" />
                  <div className="absolute left-6 top-8 h-3 w-3 rounded-full bg-fuchsia-400/80 blur-[1px]" />
                  <div className="absolute right-7 top-12 h-2.5 w-2.5 rounded-full bg-sky-400/80 blur-[1px]" />
                  <div className="absolute left-10 bottom-8 h-2.5 w-2.5 rounded-full bg-emerald-400/80 blur-[1px]" />
                </div>

                <div className="relative flex h-64 items-center justify-center px-8">
                  {/* Envelope + calendar illustration (no text) */}
                  <svg
                    viewBox="0 0 220 140"
                    className="h-full w-full max-w-xs text-primary"
                  >
                    <defs>
                      <linearGradient id="wisher-env" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                      <linearGradient id="wisher-chip" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#e0f2fe" />
                        <stop offset="100%" stopColor="#fef3c7" />
                      </linearGradient>
                    </defs>

                    {/* floating circles */}
                    <circle
                      cx="34"
                      cy="30"
                      r="7"
                      fill="#f97316"
                      className="animate-bounce"
                    />
                    <circle
                      cx="188"
                      cy="34"
                      r="9"
                      fill="#22c55e"
                      className="animate-pulse"
                    />
                    <circle cx="190" cy="104" r="6" fill="#38bdf8" />

                    {/* subtle arc path */}
                    <path
                      d="M20 110 C 70 90, 150 90, 200 110"
                      fill="none"
                      stroke="#e0e7ff"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />

                    {/* main envelope */}
                    <g transform="translate(38,38)">
                      <rect
                        x="6"
                        y="10"
                        width="120"
                        height="76"
                        rx="18"
                        fill="white"
                        opacity="0.98"
                      />
                      <path
                        d="M14 24 L66 58 L118 24"
                        fill="none"
                        stroke="url(#wisher-env)"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <path
                        d="M14 80 L50 48"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M118 80 L82 48"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* small floating envelope behind */}
                    <g transform="translate(20,18)" opacity="0.75">
                      <rect
                        x="0"
                        y="8"
                        width="60"
                        height="38"
                        rx="12"
                        fill="white"
                      />
                      <path
                        d="M6 18 L30 32 L54 18"
                        fill="none"
                        stroke="#c4b5fd"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </g>

                    {/* small calendar card */}
                    <g transform="translate(132,78)">
                      <rect
                        x="0"
                        y="0"
                        width="60"
                        height="46"
                        rx="12"
                        fill="white"
                        opacity="0.98"
                      />
                      <rect
                        x="0"
                        y="0"
                        width="60"
                        height="18"
                        rx="12"
                        fill="url(#wisher-chip)"
                      />
                      <circle cx="12" cy="9" r="2.5" fill="#0ea5e9" />
                      <circle cx="22" cy="9" r="2.5" fill="#6366f1" />
                      <circle cx="32" cy="9" r="2.5" fill="#ec4899" />
                      <rect
                        x="14"
                        y="24"
                        width="32"
                        height="3"
                        rx="1.5"
                        fill="#c7d2fe"
                      />
                      <rect
                        x="18"
                        y="32"
                        width="24"
                        height="3"
                        rx="1.5"
                        fill="#e5e7eb"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-6xl px-4 py-10 md:py-14">
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
            {user
              ? "Start scheduling heartfelt wishes that arrive exactly when they're meant to."
              : "Join Wisher today and start scheduling heartfelt wishes that arrive exactly when they're meant to."}
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            {user ? (
              <Link
                to="/home"
                className="rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-fuchsia-300/40 transition hover:-translate-y-0.5 hover:shadow-fuchsia-400/60"
              >
                Add Wish
              </Link>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

