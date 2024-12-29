export type TAccount = {
  id: string;
  name: string;
  role?: string;
  thumbnailUrl: string;
  updatedAt?: number;
};

type TAccountRow = {
  id: string;
  name: string;
  role: string;
  thumbnail_url: string;
  updated_at: string;
};
