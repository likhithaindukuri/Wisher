import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWishesContext } from "../hooks/useWishesContext";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

const WishForm = () => {
  const { dispatch } = useWishesContext();
  const { user } = useAuthContext();
  
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleTextChange = (e) => {
    const inputValue = e.target.value;

    // Check if the input value exceeds 40 characters
    if (inputValue.length > 40) {
      setError('Only 40 characters allowed');
    } else {
      setError(null);
    }

    // Update the state
    setText(inputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in!');
      return;
    }

    const wish = {
      title,
      text,
      date,
      time,
      email,
    };

    try {
      const response = await fetch(`${API_URL}/api/wishes`, {
        method: "POST",
        body: JSON.stringify(wish),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const contentType = response.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const json = isJson ? await response.json() : null;

      if (!response.ok) {
        if (response.status === 401) {
          setEmptyFields([]);
          setError("Your session has expired. Please log in again.");
          return;
        }

        setError(
          json?.error ||
            "Unable to add the wish. Please check your inputs and try again."
        );
        setEmptyFields((json && json.emptyFields) || []);
        return;
      }

      setTitle("");
      setText("");
      setDate("");
      setTime("");
      setEmail("");
      setError(null);
      setEmptyFields([]);

      if (json?.date) {
        const formattedDate = new Date(json.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        json.date = formattedDate;
      }

      dispatch({ type: "CREATE_WISH", payload: json });
    } catch (error) {
      console.error("Error during adding the wish is:", error);
      setError(
        "An error occurred while adding the wish. Please ensure the server is running and try again."
      );
    }
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-x-4 -top-10 h-32 rounded-full bg-primary/10 blur-3xl" />
      <form
        className="relative space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/80"
        onSubmit={handleSubmit}
      >
        <div>
          <h3 className="text-base font-semibold tracking-tight text-slate-900">
            Create a new wish
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Choose who to surprise, what to say, and when they should receive
            it.
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">
            Wishing title
          </label>
          <select
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={`w-full rounded-lg border bg-white px-3 py-2 text-xs text-slate-900 outline-none ring-primary/30 transition focus:border-primary focus:ring-2 ${
              emptyFields.includes("title") || error
                ? "border-red-500"
                : "border-slate-700"
            }`}
          >
            <option value="">Select a title</option>
            <option value="BirthDay">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Festival">Festival</option>
            <option value="Event">Event</option>
            <option value="Important events">Important event</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">
            Your message
          </label>
          <input
            type="text"
            onChange={handleTextChange}
            value={text}
            className={`w-full rounded-lg border bg-white px-3 py-2 text-xs text-slate-900 outline-none ring-primary/30 transition focus:border-primary focus:ring-2 ${
              emptyFields.includes("text") || error
                ? "border-red-500"
                : "border-slate-700"
            }`}
            placeholder="Write a short, heartfelt message (max 40 characters)"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">Date</label>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-xs text-slate-900 outline-none ring-primary/30 transition focus:border-primary focus:ring-2 ${
                emptyFields.includes("date") || error
                  ? "border-red-500"
                  : "border-slate-700"
              }`}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">Time</label>
            <input
              type="time"
              onChange={(e) => setTime(e.target.value)}
              value={time}
              className={`w-full rounded-lg border bg-white px-3 py-2 text-xs text-slate-900 outline-none ring-primary/30 transition focus:border-primary focus:ring-2 ${
                emptyFields.includes("time") || error
                  ? "border-red-500"
                  : "border-slate-700"
              }`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-700">
            Recipient email
          </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={`w-full rounded-lg border bg-white px-3 py-2 text-xs text-slate-900 outline-none ring-primary/30 transition focus:border-primary focus:ring-2 ${
              emptyFields.includes("email") || error
                ? "border-red-500"
                : "border-slate-700"
            }`}
            placeholder="friend@example.com"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-500/60 bg-red-50 px-3 py-2 text-[11px] text-red-600">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="mt-1 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-fuchsia-500/30 transition hover:-translate-y-0.5 hover:shadow-fuchsia-500/60"
        >
          Add wish
        </button>
      </form>
    </div>
  );
};

export default WishForm;
