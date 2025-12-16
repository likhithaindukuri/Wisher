// src/pages/NotFound.js

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <img
          src="/404.svg"
          alt="404 Not Found"
          className="mx-auto mb-6 w-64 max-w-xs opacity-90"
        />
        <h3 className="text-xl font-semibold text-slate-900">
          The page you’re looking for doesn’t exist.
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          It might have been moved, or the link could be broken.
        </p>
        <Link
          to="/"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-fuchsia-500/40 transition hover:-translate-y-0.5 hover:shadow-fuchsia-500/60"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
