import Navigation from '../components/Navigation';
import { CardLayout, PageLayout } from '../layout';

const MOCKS = [
  {
    article:
      'The Shiba Inu is a breed of hunting dog from Japan. A small-to-medium breed, it is the smallest of the six original dog breeds native to Japan. Its name literally translates to "brushwood dog", as it is used to flush game. A small, alert, and agile dog that copes very well with mountainous terrain and hiking trails, the Shiba Inu was originally bred for hunting. It looks similar to other Japanese dog breeds such as the Akita Inu or Hokkaido, but the Shiba Inu is a different breed with a distinct bloodline, temperament, and smaller size than other Japanese dog breeds.',
    assigner: {
      id: '89hafjo4',
      name: 'Admin',
      thumbnail:
        'https://avatarfiles.alphacoders.com/374/thumb-1920-374826.png',
    },
    datetime: 1734961716437,
    writer: {
      id: 'fh03fjaoj',
      name: 'Shiba',
      thumbnail:
        'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474492LMy/avatar-cho-sieu-dang-yeu_042636860.jpg',
    },
    id: 'lhga389hf',
    status: 'draft',
    target: {
      id: 'oihgva34',
      name: 'Husky',
      thumbnail: 'https://avatarfiles.alphacoders.com/266/266280.jpg',
    },
  },
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

export default function Home() {
  return (
    <PageLayout className="">
      <CardLayout className="grow">
        <div className="overflow-y-scroll">
          <table className="table-pin-rows table">
            <thead>
              <tr>
                <th>Target</th>
                <th>Writer</th>
                <th>Excerpt</th>
                <th>Assigner</th>
                <th>Updated Time</th>
              </tr>
            </thead>
            <tbody>
              {MOCKS.map(
                ({ article, assigner, datetime, writer, id, target }) => {
                  return (
                    <tr key={id}>
                      <td>{target.name}</td>
                      <td>{writer.name}</td>
                      <td>{article.slice(0, 60)}</td>
                      <td>{assigner.name}</td>
                      <td>{new Date(datetime).toLocaleString()}</td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      </CardLayout>
      <Navigation />
    </PageLayout>
  );
}
