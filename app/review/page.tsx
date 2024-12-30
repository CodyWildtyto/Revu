'use client';

import { User } from 'next-auth';
import { useSession } from 'next-auth/react';

import { useReviews } from '@/app/hooks';
import { Card } from '@/components/Card';
import Page from '@/components/Page';
import Nav from '@/components/Nav';
import { TAccount } from '@/types/account';
import { ReviewNewButton } from './ReviewNewButton';
import ReviewTable from './ReviewTable';

export default function Review() {
  const { data: list, isLoading, refresh } = useReviews();
  const { data: session } = useSession();

  const user = session?.user as User & TAccount;
  const isAdmin = user?.role === 'admin';

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
          <span className="loading loading-dots" />
        ) : list.length ? (
          <ReviewTable data={list} onEditSuccess={handleEditSuccess} />
        ) : (
          '-'
        )}
        {isAdmin && <ReviewNewButton onSuccess={handleNewSuccess} />}
      </Card>
      <Nav />
    </Page>
  );
}
