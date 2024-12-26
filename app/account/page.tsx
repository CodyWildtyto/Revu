import Page from '@/components/Page';
import { Card } from '@/components/Card';
import Nav from '@/components/Nav';
import AccountTable from './AccountTable';

const MOCKS = [
  {
    datetime: 1734801721481,
    id: '89hafjo4',
    name: 'Admin',
    role: 'admin',
    thumbnail: 'https://avatarfiles.alphacoders.com/374/thumb-1920-374826.png',
  },
  {
    datetime: 1734863629113,
    id: 'fh03fjaoj',
    name: 'Shiba',
    role: 'general',
    thumbnail:
      'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474492LMy/avatar-cho-sieu-dang-yeu_042636860.jpg',
  },
  {
    datetime: 1734903824172,
    id: 'oihgva34',
    name: 'Husky',
    role: 'general',
    thumbnail: 'https://avatarfiles.alphacoders.com/266/266280.jpg',
  },
];

export default function Account() {
  return (
    <Page>
      <Card className="grow">
        <h2>Account</h2>
        <AccountTable data={MOCKS} />
      </Card>
      <Nav />
    </Page>
  );
}
