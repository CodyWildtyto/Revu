import Image from 'next/image';
import Navigation from '../components/Navigation';
import { CardLayout, PageLayout } from '../layout';

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

export default function Home() {
  return (
    <PageLayout className="">
      <CardLayout className="grow">
        <div className="overflow-y-scroll">
          <table className="table-pin-rows table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Name</th>
                <th>Role</th>
                <th>Reviews</th>
                <th>Assignments</th>
                <th>Updated Time</th>
              </tr>
            </thead>
            <tbody>
              {MOCKS.map(({ datetime, id, name, role, thumbnail }) => {
                return (
                  <tr key={id}>
                    <td>
                      <Image
                        className="rounded-xl"
                        src={thumbnail}
                        alt={name}
                        width={24}
                        height={24}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{role}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{new Date(datetime).toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardLayout>
      <Navigation />
    </PageLayout>
  );
}
