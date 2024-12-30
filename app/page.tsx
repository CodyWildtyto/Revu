import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import Page from '@/components/Page';
import LoginPanel from './Auth/LoginPanel';

export default async function Index() {
  const session = await getServerSession();

  if (session) redirect('/review');

  return (
    <Page className="ml-auto mr-auto max-w-screen-xl items-center">
      <h1 className="grow">Rev:u</h1>
      <LoginPanel />
    </Page>
  );
}
