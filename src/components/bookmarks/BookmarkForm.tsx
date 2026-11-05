import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { AxiosError } from "axios";
import {
  useCreateBookmark,
  useUpdateBookmark,
  useBookmarkById,
} from "../../hooks/useBookmarks";
import { useNavigate } from "react-router-dom";
import type {
  CreateBookmarkPayload,
  BookmarkFormValues,
  UpdateBookmarkPayload,
} from "../../types/bookmark.types";

interface BookmarkFormProps {
  bookmarkId?: string;
  onCreated?: () => void;
  onUpdated?: () => void;
}

const BookmarkForm = ({
  bookmarkId,
  onCreated,
  onUpdated,
}: BookmarkFormProps) => {
  const isEditMode = Boolean(bookmarkId);
  const navigate = useNavigate();

  const createMutation = useCreateBookmark();
  const updateMutation = useUpdateBookmark();

  const bookmarkQuery = useBookmarkById(bookmarkId || "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookmarkFormValues>({
    defaultValues: {
      url: "",
      title: "",
      tags: "",
      notes: "",
    },
  });

  // Existing bookmark data form mein fill karna
  useEffect(() => {
    if (isEditMode && bookmarkQuery.data) {
      const response: any = bookmarkQuery.data;
      const bookmark = response?.data ?? response;

      reset({
        url: bookmark.url || "",
        title: bookmark.title || "",
        tags: bookmark.tags?.join(", ") || "",
        notes: bookmark.notes || "",
      });
    }
  }, [isEditMode, bookmarkQuery.data, reset]);

  // Form submit
  const onSubmit = (values: BookmarkFormValues) => {
    const tags = values.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (isEditMode && bookmarkId) {
      const payload: UpdateBookmarkPayload = {
        url: values.url,
        title: values.title,
        tags,
        notes: values.notes,
      };

      updateMutation.mutate(
        {
          id: bookmarkId,
          payload,
        },
        {
          onSuccess: () => {
            onUpdated?.();
            navigate("/bookmarks");
          },
        }
      );

      return;
    }

    const payload: CreateBookmarkPayload = {
      url: values.url,
      title: values.title,
      notes: values.notes,
      tags,
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        reset();
        onCreated?.();
        navigate("/bookmarks");
      },
    });
  };

  const isSaving =
    createMutation.isPending || updateMutation.isPending;

  // API Error
  const isError = isEditMode
    ? updateMutation.isError
    : createMutation.isError;

  const error = isEditMode
    ? updateMutation.error
    : createMutation.error;

  const errorMessage =
    (error as AxiosError<{ message: string }> | null)
      ?.response?.data?.message ||
    "Unable to save bookmark";

  // Edit loading
  if (isEditMode && bookmarkQuery.isPending) {
    return (
      <div className="max-w-xl rounded-xl bg-white p-6 shadow">
        <p className="text-center text-gray-500">
          Loading bookmark details...
        </p>
      </div>
    );
  }

  // Edit fetch error
  if (isEditMode && bookmarkQuery.isError) {
    return (
      <div className="max-w-xl rounded-xl bg-red-50 p-6 text-red-600">
        Unable to load bookmark details.
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-xl font-bold">
        {isEditMode ? "Edit Bookmark" : "Add New Bookmark"}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

        {/* Website URL */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Website URL *
          </label>

          <input
            {...register("url", {
              required: "URL is required",
              pattern: {
                value: /^https?:\/\/.+/i,
                message: "Enter a valid HTTP or HTTPS URL",
              },
            })}
            placeholder="https://example.com"
            className="w-full rounded-lg border p-3 outline-none focus:border-teal-500"
          />

          {errors.url && (
            <p className="mt-1 text-sm text-red-500">
              {errors.url.message}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Title
          </label>

          <input
            {...register("title")}
            placeholder="Website title"
            className="w-full rounded-lg border p-3 outline-none focus:border-teal-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Tags
          </label>

          <input
            {...register("tags")}
            placeholder="Development, Coding, Learning"
            className="w-full rounded-lg border p-3 outline-none focus:border-teal-500"
          />

          <p className="mt-1 text-xs text-gray-500">
            Separate multiple tags with commas.
          </p>
        </div>

        {/* Notes */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Notes
          </label>

          <textarea
            {...register("notes")}
            placeholder="Write something about this bookmark..."
            rows={3}
            className="w-full rounded-lg border p-3 outline-none focus:border-teal-500"
          />
        </div>

        {/* API Error */}
        {isError && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSaving}
          className="w-full rounded-lg bg-teal-800 px-4 py-3 font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving
            ? isEditMode
              ? "Updating..."
              : "Saving..."
            : isEditMode
              ? "Update Bookmark"
              : "Save Bookmark"}
        </button>

      </form>
    </div>
  );
};

export default BookmarkForm;
