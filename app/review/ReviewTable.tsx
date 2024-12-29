import Thumbnail from '@/components/Thumbnail';
import { TReview } from '@/types/review';

export default function ReviewTable({ data }: { data: TReview[] }) {
  return (
    <div className="overflow-y-scroll">
      <table className="table table-pin-rows">
        <thead>
          <tr>
            <th>Target</th>
            <th>Writer</th>
            <th>Excerpt</th>
            <th>Status</th>
            <th>Updated Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ article, id, status, target, updatedAt, writer }) => {
            return (
              <tr className="hover" key={id}>
                <td>
                  <Thumbnail
                    className="mr-2"
                    src={target.thumbnailUrl}
                    alt={target.name}
                  >
                    {target.name}
                  </Thumbnail>
                </td>
                <td>
                  <Thumbnail
                    className="mr-2"
                    src={writer.thumbnailUrl}
                    alt={writer.name}
                  >
                    {writer.name}
                  </Thumbnail>
                </td>
                <td>{article.slice(0, 40)}...</td>
                <td>{status}</td>
                <td>{new Date(updatedAt).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
