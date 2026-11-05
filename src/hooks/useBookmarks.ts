
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import {
  getBookmarks,
  getBookmarkById,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} from "../api/bookmark.api";

import type {
  BookmarkListParams,
} from "../api/bookmark.api";

import type {
  CreateBookmarkPayload,
  UpdateBookmarkPayload,
} from "../types/bookmark.types";

// Query Keys
export const bookmarkKeys = {
  all: ["bookmarks"] as const,
  lists: () => [...bookmarkKeys.all, "list"] as const,
  list: (params?: BookmarkListParams) =>
    [...bookmarkKeys.lists(), params] as const,
  details: () => [...bookmarkKeys.all, "detail"] as const,
  detail: (id: string) =>
    [...bookmarkKeys.details(), id] as const,
};

export const useBookmarks = (params?: BookmarkListParams) =>
  useQuery({
    queryKey: bookmarkKeys.list(params),
    queryFn: () => getBookmarks(params),
    placeholderData: keepPreviousData,
  });

// GET: Single bookmark
export const useBookmarkById = (id: string) => {
  return useQuery({
    queryKey: bookmarkKeys.detail(id),
    queryFn: () => getBookmarkById(id),
    enabled: Boolean(id),
  });
};

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBookmarkPayload) =>
      createBookmark(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
      });
    },
  });
};

export const useUpdateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateBookmarkPayload;
    }) => updateBookmark(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
      });
    },
  });
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBookmark(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookmarkKeys.all,
      });
    },
  });
};
