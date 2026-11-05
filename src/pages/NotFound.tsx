
import { Link, useNavigate } from "react-router-dom";
import { Home, ArrowLeft, Bookmark, SearchX } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-lg text-center">

        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-50">
          <Bookmark size={38} className="text-teal-700" />
        </div>

        <h1 className="text-8xl font-extrabold tracking-tight text-teal-700">
          404
        </h1>

        <div className="mt-4 flex items-center justify-center gap-2">
          <SearchX size={22} className="text-gray-500" />
          <h2 className="text-2xl font-bold text-gray-800">
            Page Not Found
          </h2>
        </div>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
          Sorry! The page you are looking for doesn't exist,
          has been moved, or the URL is incorrect.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/bookmarks"
            className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        <p className="mt-10 text-xs text-gray-400">
          Link Vault · Bookmark Manager
        </p>
      </div>
    </div>
  );
};

export default NotFound;
