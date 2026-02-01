export interface PageData {
  slug: string;
  title: string;
  content: string;
  images: string[];
}

export interface GalleryItem {
  id: string;
  url: string;
  originalName?: string;
  uploadedAt?: string;
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  ok?: boolean;
}

export interface AdminCredentials {
  password: string;
}

export interface AdminLoginResponse {
  ok: boolean;
  error?: string;
}

export interface UploadResponse {
  ok: boolean;
  entry?: GalleryItem;
}