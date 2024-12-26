import { TAccount } from './account';

export type TReview = {
  article: string;
  assigner: TAccount;
  datetime: number;
  writer: TAccount;
  id: string;
  status: string;
  target: TAccount;
};
