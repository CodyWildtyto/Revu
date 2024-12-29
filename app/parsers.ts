import { TAccountRow } from '@/types/account';
import { TReviewDBRow, TReviewRow } from '@/types/review';

export const parseAccountApiRow = (row: TAccountRow) => ({
  id: row.id,
  name: row.name,
  role: row.role,
  thumbnailUrl: row.thumbnail_url,
  updatedAt: Number(row.updated_at),
});

export const parseReviewApiRow = (row: TReviewRow) => ({
  article: row.article,
  id: row.id,
  status: row.status,
  target: { ...row.target, thumbnailUrl: row.target?.thumbnail_url },
  updatedAt: Number(row.updated_at),
  writer: { ...row.writer, thumbnailUrl: row.writer?.thumbnail_url },
});

export const parseReviewDBRow = (row: TReviewDBRow) => ({
  id: row.id,
  article: row.article,
  status: row.status,
  target: {
    id: row.target_id,
    name: row.target_name,
    thumbnail_url: row.target_thumbnail_url,
  },
  writer: {
    id: row.writer_id,
    name: row.writer_name,
    thumbnail_url: row.writer_thumbnail_url,
  },
  updated_at: row.updated_at,
});
