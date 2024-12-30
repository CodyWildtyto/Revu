'use client';

import { useAccounts } from '@/app/hooks';
import { Card } from '@/components/Card';
import Page from '@/components/Page';
import Nav from '@/components/Nav';
import AccountTable from './AccountTable';
import { AccountNewButton } from './AccountNewButton';

export default function Account() {
  const { data: list, isLoading, refresh } = useAccounts();

  const handleNewSuccess = () => {
    refresh();
  };

  return (
    <Page>
      <Card className="grow">
        <h2>Account</h2>
        {isLoading ? (
          <span className="loading loading-dots" />
        ) : list.length ? (
          <AccountTable data={list} onEditSuccess={handleNewSuccess} />
        ) : (
          '-'
        )}
        <AccountNewButton onSuccess={handleNewSuccess} />
      </Card>
      <Nav />
    </Page>
  );
}
