'use client';

import { useReviews } from '@/app/hooks';
import { Card } from '@/components/Card';
import Page from '@/components/Page';
import Nav from '@/components/Nav';
import { ReviewNewButton } from './ReviewNewButton';
import ReviewTable from './ReviewTable';

export default function Review() {
  const { data: list, isLoading, refresh } = useReviews();

  const handleEditSuccess = () => {
    refresh();
  };

  const handleNewSuccess = () => {
    refresh();
  };

  return (
    <Page>
      <Card className="grow">
        <h2>Review</h2>
        {isLoading ? (
          <span className="loading loading-dots loading-sm" />
        ) : list.length ? (
          <ReviewTable data={list} onEditSuccess={handleEditSuccess} />
        ) : (
          '-'
        )}
        <ReviewNewButton onSuccess={handleNewSuccess} />
      </Card>
      <Nav />
    </Page>
  );
}
