
export interface Bookmark {
  _id: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// API create payload
export interface CreateBookmarkPayload {
  url: string;
  title?: string;
  description?: string;
  tags: string[];
  notes?: string;
}

// Form values
export interface BookmarkFormValues {
  url: string;
  title: string;
  tags: string;
  notes: string;
}

// API update payload
export interface UpdateBookmarkPayload {
  url?: string;
  title?: string;
  description?: string;
  tags?: string[];
  notes?: string;
}

// Bookmark list API response
export interface BookmarkListResponse {
  success: boolean;
  data: Bookmark[];
  pagination: {
    currentPage: number;
    pageLimit: number;
    totalBookmarks: number;
    totalPages: number;
  };
}