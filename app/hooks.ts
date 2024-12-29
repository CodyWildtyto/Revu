import { useCallback, useEffect, useRef, useState } from 'react';

import { TAccount } from '@/types/account';
import { API_URL } from './constants';
import { parseAccountApiRow, parseReviewApiRow } from './parsers';

export function useAccounts() {
  const loading = useRef(true);
  const [list, setList] = useState<TAccount[]>([]);

  const fetchData = useCallback(async () => {
    const response = await fetch(`${API_URL}/accounts`);
    const data = (await response.json()).map(parseAccountApiRow);

    loading.current = response.status !== 200;

    setList(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data: list, isLoading: loading.current };
}

export function useReviews() {
  const loading = useRef(true);
  const [list, setList] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await fetch(`${API_URL}/reviews`);
    const data = (await response.json()).map(parseReviewApiRow);

    loading.current = response.status !== 200;

    setList(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data: list, isLoading: loading.current };
}

export function useReviewsByAccount(id: string) {
  const loading = useRef(true);
  const [list, setList] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await fetch(`${API_URL}/reviewsByAccount/${id}`);
    const data = (await response.json()).map(parseReviewApiRow);

    loading.current = response.status !== 200;

    setList(data);
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data: list, isLoading: loading.current };
}
