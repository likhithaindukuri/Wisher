import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-lg font-bold text-white shadow-md shadow-fuchsia-300/40">
            W
          </div>
          <div className="text-left">
            <h1 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
              Wisher
            </h1>
            <p className="text-xs font-medium text-slate-500 md:text-sm">
              Never miss a special moment again.
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          {user && (
            <div className="flex items-center gap-4">
              <span className="hidden text-xs text-slate-500 sm:inline">
                Signed in as
              </span>
              <span className="max-w-[180px] truncate rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-800">
                {user.email}
              </span>
              <button
                type="button"
                onClick={handleClick}
                className="rounded-full border border-primary/70 bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5 hover:text-primary hover:shadow-primary/30"
              >
                Log out
              </button>
            </div>
          )}

          {!user && (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:text-primary hover:underline hover:decoration-primary hover:decoration-2"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-fuchsia-300/50 transition hover:-translate-y-0.5 hover:shadow-fuchsia-400/70"
              >
                Sign up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

