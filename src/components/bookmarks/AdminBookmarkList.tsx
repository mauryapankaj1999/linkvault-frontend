import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Pencil,
  Trash2,
  ExternalLink,

} from "lucide-react";

import {
  useBookmarks,
  useDeleteBookmark,
} from "../../hooks/useBookmarks";

import type { Bookmark } from "../../types/bookmark.types";
// import type { Bookmark } from "../types/bookmark.types";
const AdminBookmarkList = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const limit = 10;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useBookmarks({
    page,
    limit,
    search,
  });

  const deleteMutation = useDeleteBookmark();

const bookmarks: any[] = (data as any)?.data ?? [];
const totalPages: any = (data as any)?.pagination?.totalPages ?? 1;

  useEffect(() => {
    if (!isLoading && bookmarks.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [bookmarks.length, isLoading, page]);

  const handleDelete = (bookmark: Bookmark) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${bookmark.title || bookmark.url}"?`
    );

    if (confirmed) {
      deleteMutation.mutate(bookmark._id);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            All Bookmarks
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage all your saved bookmarks.
          </p>
        </div>

        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search bookmarks by title..."
            className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 outline-none focus:border-teal-600"
          />
        </div>
      
      </div>

      {/* Search */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

       
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        {isLoading ? (
          <div className="p-10 text-center text-gray-500">
            Loading bookmarks...
          </div>
        ) : isError ? (
          <div className="p-10 text-center">
            <p className="mb-4 text-red-500">
              {error?.message || "Failed to load bookmarks"}
            </p>

            <button
              onClick={() => refetch()}
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="p-10 text-center text-gray-500">
            <p className="text-lg font-semibold">
              No bookmarks found
            </p>

            <p className="mt-1 text-sm">
              {search
                ? "Try another search keyword."
                : "Add your first bookmark to get started."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">

              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-5 py-4 font-semibold">S.No.</th>
                  <th className="px-5 py-4 font-semibold">Title</th>
                  <th className="px-5 py-4 font-semibold">Website URL</th>
                  <th className="px-5 py-4 font-semibold">Tags</th>
                  <th className="px-5 py-4 font-semibold">Created Date</th>
                  <th className="px-5 py-4 text-center font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {bookmarks.map((bookmark, index) => (
                  <tr
                    key={bookmark._id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4 text-gray-500">
                      {(page - 1) * limit + index + 1}
                    </td>

                    <td className="px-5 py-4 font-medium text-gray-800">
                      {bookmark.title || "Untitled"}
                    </td>

                    <td className="max-w-[250px] truncate px-5 py-4">
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {bookmark.url}
                      </a>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {bookmark.tags?.map((tag: string, index: number) => (
                          <span
                            key={`${tag}-${index}`}
                            className="rounded-md bg-teal-50 px-2 py-1 text-xs text-teal-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                      {new Date(
                        bookmark.createdAt
                      ).toLocaleDateString()}
                    </td>

                    {/* Action Icons */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-4">

                        <button
                          title="Visit website"
                          onClick={() =>
                            window.open(
                              bookmark.url,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          className="text-gray-500 hover:text-teal-700"
                        >
                          <ExternalLink size={18} />
                        </button>

                        <button
                          title="Edit bookmark"
                          onClick={() =>
                            navigate(`/bookmarks/edit/${bookmark._id}`)
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          title="Delete bookmark"
                          disabled={deleteMutation.isPending}
                          onClick={() => handleDelete(bookmark)}
                          className="text-red-500 hover:text-red-700 disabled:opacity-50"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && bookmarks.length > 0 && (
          <div className="flex flex-col justify-between gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center">

            <p className="text-sm text-gray-500">
              Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((prev) => prev - 1)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="rounded-lg bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700">
                {page}
              </span>

              <button
                disabled={page >= totalPages || isFetching}
                onClick={() => setPage((prev) => prev + 1)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {deleteMutation.isError && (
        <p className="text-sm text-red-600">
          {deleteMutation.error.message || "Unable to delete bookmark"}
        </p>
      )}

    </div>
  );
};

export default AdminBookmarkList;
