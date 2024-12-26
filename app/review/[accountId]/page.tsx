'use client';

import { useParams } from 'next/navigation';

import Page from '@/components/Page';
import { Card } from '@/components/Card';
import Nav from '@/components/Nav';
import ReviewTable from '../ReviewTable';

const MOCKS = [
  {
    article:
      'Husky is a general term for a dog used in the polar regions, primarily and specifically for work as sled dogs. It refers to a traditional northern type, notable for its cold-weather tolerance and overall hardiness. Modern racing huskies that maintain arctic breed traits (also known as Alaskan huskies) represent an ever-changing crossbreed of the fastest dogs.\nHuskies have continued to be used in sled-dog racing, as well as expedition and trek style tour businesses, and as a means of essential transportation in rural communities. Huskies are also kept as pets, and groups work to find new pet homes for retired racing and adventure-trekking dogs.',
    assigner: {
      id: '89hafjo4',
      name: 'Admin',
      thumbnail:
        'https://avatarfiles.alphacoders.com/374/thumb-1920-374826.png',
    },
    datetime: 1734971866231,
    writer: {
      id: 'oihgva34',
      name: 'Husky',
      thumbnail: 'https://avatarfiles.alphacoders.com/266/266280.jpg',
    },
    id: 'oiaf3jee',
    status: 'draft',
    target: {
      id: 'fh03fjaoj',
      name: 'Shiba',
      thumbnail:
        'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474492LMy/avatar-cho-sieu-dang-yeu_042636860.jpg',
    },
  },
];

export default function ReviewByAccountId() {
  const { accountId } = useParams();

  return (
    <Page>
      <Card className="grow">
        <h2>Review : {accountId}</h2>
        <ReviewTable data={MOCKS} />
      </Card>
      <Nav />
    </Page>
  );
}
