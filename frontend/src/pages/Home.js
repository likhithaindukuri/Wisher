import { useEffect } from "react";
import { useWishesContext } from "../hooks/useWishesContext";
import { useAuthContext } from "../hooks/useAuthContext";
import WishDetails from "../components/WishDetails";
import WishForm from "../components/WishForm";

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
          (a, b) => new Date(a.date) - new Date(b.date),
        );
        dispatch({ type: "SET_WISHES", payload: sortedWishes });
      }
    };

    if (user) {
      fetchWishes();
    }
  }, [dispatch, user]);

  const currentDate = new Date();

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)]">
      <section className="space-y-4">
        <header className="mb-2 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
              Upcoming wishes
            </h2>
            <p className="text-xs text-slate-500 md:text-sm">
              All the messages you’ve scheduled to make someone’s day.
            </p>
          </div>
        </header>

        <div className="space-y-4">
          {wishes && wishes.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-4 py-8 text-center text-sm text-slate-500">
              You don’t have any upcoming wishes yet. Create one on the right to
              surprise someone!
            </div>
          )}

          {wishes &&
            wishes.map((wish) => {
              const wishDate = new Date(wish.date);

              if (wishDate >= currentDate) {
                return <WishDetails wish={wish} key={wish._id} />;
              }

              return null;
            })}
        </div>
      </section>

      <aside className="md:pl-2">
        <WishForm />
      </aside>
    </div>
  );
};

export default Home;