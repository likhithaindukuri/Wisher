import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import WishDetails from "../components/WishDetails";
import WishForm from "../components/WishForm";
import { useWishesContext } from "../hooks/useWishesContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

const Home = () => {
  const { wishes, dispatch } = useWishesContext();
  const { user } = useAuthContext();

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

    if (user) {
      fetchWishes();
    }
  }, [dispatch, user]);

  const currentDate = new Date();
  const firstName = user?.email?.split("@")[0] || "there";

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

  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white/80 px-4 py-4 shadow-sm shadow-slate-100 md:px-6 md:py-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Your wishboard
            </p>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900 md:text-2xl">
              Hi {firstName}, here are your upcoming wishes
            </h1>
            <p className="mt-1 text-xs text-slate-500 md:text-sm">
              Keep birthdays, anniversaries, and celebrations perfectly on time
              with scheduled emails that make someone&apos;s day.
            </p>
          </div>
          <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-600">
            <div className="hidden items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 ring-1 ring-slate-200 md:inline-flex">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-fuchsia-500/20 text-[12px] text-primary">
                ✨
              </span>
              <span>Tip: Add wishes a few days early and relax.</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2.1fr)_minmax(0,1.1fr)]">
        <section className="space-y-4">
          {/* Tabs */}
          <div className="inline-flex rounded-full border border-slate-200 bg-slate-50/80 p-1 text-xs font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTab("upcoming")}
              className={`rounded-full px-4 py-1.5 transition ${
                activeTab === "upcoming"
                  ? "bg-white text-primary shadow-sm shadow-primary/20"
                  : "hover:text-primary"
              }`}
            >
              Upcoming wishes
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("completed")}
              className={`rounded-full px-4 py-1.5 transition ${
                activeTab === "completed"
                  ? "bg-white text-emerald-700 shadow-sm shadow-emerald-200"
                  : "hover:text-emerald-700"
              }`}
            >
              Completed wishes
            </button>
          </div>

          {/* Tab content */}
          {activeTab === "upcoming" && (
            <div className="space-y-4">
              <header className="mb-1 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-slate-900 md:text-base">
                    Upcoming wishes
                  </h2>
                  <p className="text-xs text-slate-500 md:text-[13px]">
                    All the messages you’ve scheduled to make someone’s day.
                  </p>
                </div>
              </header>

              <div className="space-y-4">
                {wishes && wishes.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 px-4 py-8 text-center text-sm text-slate-500">
                    You don’t have any upcoming wishes yet. Use the form on the
                    right to schedule your first wish and surprise someone
                    special.
                  </div>
                )}

                {wishes &&
                  wishes.map((wish) => {
                    const wishDateTime = getWishDateTime(wish);

                    if (wishDateTime && wishDateTime >= currentDate) {
                      return (
                        <WishDetails
                          key={wish._id}
                          variant="upcoming"
                          wish={wish}
                        />
                      );
                    }

                    return null;
                  })}
              </div>
            </div>
          )}

          {activeTab === "completed" && (
            <div className="space-y-4">
              <header className="mb-1 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-slate-900 md:text-base">
                    Completed wishes
                  </h2>
                  <p className="text-xs text-slate-500 md:text-[13px]">
                    Wishes that have already been sent are kept here for your
                    reference.
                  </p>
                </div>
              </header>

              <div className="space-y-3">
                {wishes &&
                  !wishes.some((wish) => {
                    const wishDateTime = getWishDateTime(wish);
                    return wishDateTime && wishDateTime < currentDate;
                  }) && (
                    <div className="rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 px-4 py-6 text-center text-sm text-emerald-700">
                      Once your scheduled wishes are sent, they will appear
                      here.
                    </div>
                  )}

                {wishes &&
                  wishes.map((wish) => {
                    const wishDateTime = getWishDateTime(wish);

                    if (wishDateTime && wishDateTime < currentDate) {
                      return (
                        <WishDetails
                          key={wish._id}
                          variant="completed"
                          wish={wish}
                        />
                      );
                    }

                    return null;
                  })}
              </div>
            </div>
          )}
        </section>

        <aside className="md:pl-2">
          <div className="mb-3 rounded-2xl border border-slate-200 bg-gradient-to-br from-primary/5 via-fuchsia-500/5 to-sky-400/5 p-3 text-xs text-slate-700">
            <p className="mb-0.5 font-semibold text-slate-900">
              Add a new wish
            </p>
            <p>
              Fill in the details and Wisher will handle sending your message at
              the perfect moment.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm md:p-4">
            <WishForm />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;