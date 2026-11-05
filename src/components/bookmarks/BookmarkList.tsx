import { useState } from "react";
import { Search } from "lucide-react";

import { useBookmarks } from "../../hooks/useBookmarks";
import BookmarkCard from "./BookmarkCard";
// import type { Bookmark } from "../../types/bookmark.types";
const BookmarkList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 9;

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useBookmarks({
    page,
    limit,
    search,
  });

  const bookmarks: any[] = (data as any)?.data ?? [];
const total: any = (data as any)?.pagination?.totalBookmarks ?? 0;
const totalPages: any = (data as any)?.pagination?.totalPages ?? 1;

console.log("BOOKMARK API RESPONSE:", data);
console.log("TOTAL:", total);
console.log("TOTAL PAGES:", totalPages);

  if (isPending) {
    return (
      <div className="py-12 text-center text-gray-500">
        Loading bookmarks...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-center">
        <p className="mb-3 text-red-600">
          {error.message || "Failed to load bookmarks"}
        </p>

        <button
          onClick={() => refetch()}
          className="rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section>
      
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold text-gray-900">
          My Bookmarks ({total})
        </h2>

        <div className="relative w-full sm:w-80">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search bookmarks by title..."
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 outline-none focus:border-teal-600"
          />
        </div>
      </div>

      {/* Updating Indicator */}
      {isFetching && (
        <p className="mb-3 text-right text-xs text-gray-500">
          Updating...
        </p>
      )}

      {/* Bookmark Cards */}
      {bookmarks.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-white p-10 text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            No bookmarks found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {search
              ? "Try searching with another title."
              : "Add your first bookmark to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark._id}
              bookmark={bookmark}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {/* Previous */}
          <button
            onClick={() =>
              setPage((prev) => Math.max(prev - 1, 1))
            }
            disabled={page === 1 || isFetching}
            className="rounded-lg border border-[#004b36] px-5 py-3 text-sm font-medium text-[#004b36] transition hover:bg-[#004b36] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              disabled={isFetching}
              className={`min-w-[50px] rounded-lg border px-4 py-3 text-sm font-medium transition ${
                page === pageNumber
                  ? "border-[#004b36] bg-[#004b36] text-white"
                  : "border-[#004b36] bg-white text-[#004b36] hover:bg-[#004b36] hover:text-white"
              }`}
            >
              {pageNumber}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() =>
              setPage((prev) =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={page === totalPages || isFetching}
            className="rounded-lg border border-[#004b36] px-5 py-3 text-sm font-medium text-[#004b36] transition hover:bg-[#004b36] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

     
      {/* {total > 0 && (
        <p className="mt-5 text-center text-sm text-gray-500">
          Showing {(page - 1) * limit + 1} to{" "}
          {Math.min(page * limit, total)} of {total} bookmarks
        </p>
      )} */}
    </section>
  );
};

export default BookmarkList;
