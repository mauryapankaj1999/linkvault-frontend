
import type { Bookmark } from "../../types/bookmark.types";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

const BookmarkCard = ({ bookmark }: BookmarkCardProps) => {
  return (
    // <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
       <div className="card-lift p-6 group block overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 group-hover:shadow-sm">

      
      
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {bookmark.title || "Untitled Bookmark"}
          </h3>

          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block truncate text-sm text-blue-600 hover:underline"
          >
            {bookmark.url}
          </a>
        </div>

        <span className="rounded-md bg-teal-800 px-2.5 py-2  text-[13px] font-medium text-white">
          Bookmark
        </span>
      </div>

      {bookmark.description && (
        <p className="mb-3 line-clamp-2 text-sm text-gray-600">
          {bookmark.description}
        </p>
      )}

      {bookmark.notes && (
        <p className="mb-3 text-sm text-gray-500">
          {bookmark.notes}
        </p>
      )}

      <div className="mb-4 flex flex-wrap gap-2">
        {bookmark.tags?.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="border-t pt-3 text-xs text-gray-400">
        Added: {new Date(bookmark.createdAt).toLocaleDateString()}
      </div>

    </div>
  );
};

export default BookmarkCard;
