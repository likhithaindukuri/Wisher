import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWishesContext } from "../hooks/useWishesContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

const WishDetails = ({ variant = "upcoming", wish }) => {
  const { dispatch } = useWishesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`${API_URL}/api/wishes/${wish._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WISH", payload: json });
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  };

  const isCompleted = variant === "completed";

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border p-4 shadow-md shadow-slate-200/80 transition hover:-translate-y-1 ${
        isCompleted
          ? "border-emerald-200 bg-emerald-50/80 hover:border-emerald-400 hover:shadow-emerald-300/60"
          : "border-slate-200 bg-white hover:border-primary/40 hover:shadow-primary/30"
      }`}
    >
      <div
        className={`absolute inset-x-10 -top-10 h-20 rounded-full blur-2xl opacity-0 transition group-hover:opacity-100 ${
          isCompleted ? "bg-emerald-300/40" : "bg-primary/10"
        }`}
      />
      <div className="relative space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className={`text-xs uppercase tracking-[0.2em] ${
                isCompleted ? "text-emerald-700/80" : "text-primary/80"
              }`}
            >
              {wish.title}
            </p>
            <p className="mt-1 text-sm text-slate-800">{wish.text}</p>
          </div>
          <button
            type="button"
            onClick={handleClick}
            className="rounded-full border border-slate-200 bg-white p-1.5 text-slate-500 transition hover:border-red-500/70 hover:bg-red-50 hover:text-red-500"
            aria-label="Delete wish"
          >
            <span className="material-symbols-outlined text-base">delete</span>
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${
              isCompleted ? "bg-emerald-100" : "bg-emerald-50"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isCompleted ? "bg-emerald-700" : "bg-emerald-500"
              }`}
            />
            {new Date(wish.date).toLocaleDateString("en-GB")}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 ${
              isCompleted ? "bg-emerald-50" : "bg-fuchsia-50"
            }`}
          >
            <span
              className={`h-1 w-1 rounded-full ${
                isCompleted ? "bg-emerald-500" : "bg-fuchsia-500"
              }`}
            />
            {formatTime(wish.time)}
          </span>
          <span className="inline-flex max-w-[180px] items-center gap-1 truncate rounded-full bg-slate-100 px-2.5 py-1">
            <span className="material-symbols-outlined text-xs">
              {isCompleted ? "mark_email_read" : "mail"}
            </span>
            <span className="truncate">{wish.email}</span>
          </span>
        </div>

        <p className="pt-1 text-[11px] text-slate-500">
          Created{" "}
          {formatDistanceToNow(new Date(wish.createdAt), { addSuffix: true })}
        </p>
      </div>
    </article>
  );
};

export default WishDetails;
