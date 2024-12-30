import useSWR from 'swr';

import { API_URL } from '@/app/constants';
import { parseAccountApiRow, parseReviewApiRow } from '@/app/parsers';
import { TAccount } from '@/types/account';

const fetcher = (url: string) =>
  fetch(url)
    .then((response) => response.json())
    .then(({ data }) => data);

export function useAccounts() {
  const url = `${API_URL}/accounts`;
  const { data: rows = [], isLoading, mutate } = useSWR(url, fetcher);

  return {
    data: rows.map(parseAccountApiRow) as TAccount[],
    isLoading,
    refresh: mutate,
  };
}

export function useAccount(id: string) {
  const url = `${API_URL}/account/${id}`;
  const { data: row = {}, isLoading } = useSWR(url, fetcher);

  return { data: parseAccountApiRow(row), isLoading };
}

export function useReviews() {
  const url = `${API_URL}/reviews`;
  const { data: rows = [], isLoading, mutate } = useSWR(url, fetcher);

  return { data: rows.map(parseReviewApiRow), isLoading, refresh: mutate };
}

export function useReviewsByAccount(id: string) {
  const url = `${API_URL}/reviews/account/${id}`;
  const { data: rows = [], isLoading, mutate } = useSWR(url, fetcher);

  return { data: rows.map(parseReviewApiRow), isLoading, refresh: mutate };
}
