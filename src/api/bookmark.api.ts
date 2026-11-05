
import axiosInstance from "./axiosInstance";
import type {
  Bookmark,
  CreateBookmarkPayload,
  UpdateBookmarkPayload,
} from "../types/bookmark.types";

export interface BookmarkListParams {
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
  sort?: "asc" | "desc";
}

interface BookmarkListResponse {
  success: boolean;
  data: Bookmark[];
}

interface SingleBookmarkResponse {
  success: boolean;
  data: Bookmark;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

// GET: All bookmarks

export const getBookmarks = async (
  params?: BookmarkListParams
): Promise<BookmarkListResponse> => {
  const response = await axiosInstance.get<BookmarkListResponse>(
    "/bookmarks",
    {
      params: {
        page: params?.page,
        limit: params?.limit,
        search: params?.search,
      },
    }
  );

  return response.data;
};


export const getBookmarkById = async (
  id: string
): Promise<SingleBookmarkResponse> => {
  const response = await axiosInstance.get(`/bookmarks/${id}`);
  return response.data;
};

// POST: Create bookmark
export const createBookmark = async (
  payload: CreateBookmarkPayload
): Promise<SingleBookmarkResponse> => {
  const response = await axiosInstance.post("/bookmarks", payload);
  return response.data;
};

// PATCH: Update bookmark
export const updateBookmark = async (
  id: string,
  payload: UpdateBookmarkPayload
): Promise<SingleBookmarkResponse> => {
  const response = await axiosInstance.patch(
    `/bookmarks/${id}`,
    payload
  );
  return response.data;
};

// DELETE: Delete bookmark
export const deleteBookmark = async (
  id: string
): Promise<ApiResponse> => {
  const response = await axiosInstance.delete(`/bookmarks/${id}`);
  return response.data;
};
