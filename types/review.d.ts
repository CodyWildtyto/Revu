import { TAccount, TAccountRow } from './account';

export type TReview = {
  article: string;
  id: string;
  status: string;
  target: TAccount;
  writer: TAccount;
  updatedAt: number;
};

export type TReviewRow = {
  article: string;
  id: string;
  status: string;
  target: TAccountRow;
  writer: TAccountRow;
  updated_at: number;
};

export type TReviewDBRow = {
  id: string;
  article: string;
  status: string;
  target_id: string;
  target_name: string;
  target_thumbnail_url: string;
  writer_id: string;
  writer_name: string;
  writer_thumbnail_url: string;
  updated_at: number;
};
