'use client';

import { useAccounts } from '@/app/hooks';
import { Card } from '@/components/Card';
import Page from '@/components/Page';
import Nav from '@/components/Nav';
import AccountTable from './AccountTable';

export default function Account() {
  const { data: list, isLoading } = useAccounts();

  return (
    <Page>
      <Card className="grow">
        <h2>Account</h2>
        {isLoading ? (
          <span className="loading loading-dots loading-sm" />
        ) : list.length ? (
          <AccountTable data={list} />
        ) : (
          '-'
        )}
      </Card>
      <Nav />
    </Page>
  );
}
