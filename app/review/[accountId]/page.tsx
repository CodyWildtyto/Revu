'use client';

import { useParams } from 'next/navigation';

import { useAccount, useReviewsByAccount } from '@/app/hooks';
import { Card } from '@/components/Card';
import Page from '@/components/Page';
import Nav from '@/components/Nav';
import ReviewTable from '../ReviewTable';

export default function ReviewByAccountId() {
  const { accountId } = useParams();
  const { data: account } = useAccount(accountId as string);
  const {
    data: list,
    isLoading,
    refresh,
  } = useReviewsByAccount(accountId as string);

  const handleEditSuccess = () => {
    refresh();
  };

  return (
    <Page>
      <Card className="grow">
        <h2>Review : {account?.name}</h2>
        {isLoading ? (
          <span className="loading loading-dots" />
        ) : list.length ? (
          <ReviewTable data={list} onEditSuccess={handleEditSuccess} />
        ) : (
          '-'
        )}
      </Card>
      <Nav />
    </Page>
  );
}
