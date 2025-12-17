import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  const handleClick = () => {
    logout();
  };

  const getInitials = (email) => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
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
            <div className="relative flex items-center gap-4">
              <div
                className="relative"
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
              >
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-sm font-semibold text-white shadow-md shadow-fuchsia-300/40 transition hover:scale-110 hover:shadow-lg hover:shadow-fuchsia-400/50">
                  {getInitials(user.email)}
                </div>
                {isProfileHovered && (
                  <div className="absolute right-0 top-12 z-50 min-w-[200px] rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
                    <div className="mb-2 border-b border-slate-100 pb-2">
                      <p className="text-xs font-medium text-slate-500">Signed in as</p>
                      <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                        {user.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleClick}
                      className="w-full rounded-md border border-primary/70 bg-white px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/5 hover:border-primary"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
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

