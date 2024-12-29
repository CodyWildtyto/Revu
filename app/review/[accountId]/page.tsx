'use client';

import { useParams } from 'next/navigation';

import { useReviewsByAccount } from '@/app/hooks';
import { Card } from '@/components/Card';
import Page from '@/components/Page';
import Nav from '@/components/Nav';
import ReviewTable from '../ReviewTable';

export default function ReviewByAccountId() {
  const { accountId } = useParams();
  const { data: list, isLoading } = useReviewsByAccount(accountId as string);

  return (
    <Page>
      <Card className="grow">
        <h2>Review : {accountId}</h2>
        {isLoading ? (
          <span className="loading loading-dots loading-sm" />
        ) : list.length ? (
          <ReviewTable data={list} />
        ) : (
          '-'
        )}
      </Card>
      <Nav />
    </Page>
  );
}
