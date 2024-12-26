import Thumbnail from '@/components/Thumbnail';
import { TReview } from '@/types/review';

export default function ReviewTable({ data }: { data: TReview[] }) {
  return (
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
          {data.map(({ article, assigner, datetime, writer, id, target }) => {
            return (
              <tr className="hover" key={id}>
                <td>
                  <Thumbnail
                    className="mr-2"
                    src={target.thumbnail}
                    alt={target.name}
                  >
                    {target.name}
                  </Thumbnail>
                </td>
                <td>
                  <Thumbnail
                    className="mr-2"
                    src={writer.thumbnail}
                    alt={writer.name}
                  >
                    {writer.name}
                  </Thumbnail>
                </td>
                <td>{article.slice(0, 40)}...</td>
                <td>
                  <Thumbnail
                    className="mr-2"
                    src={assigner.thumbnail}
                    alt={assigner.name}
                  >
                    {assigner.name}
                  </Thumbnail>
                </td>
                <td>{new Date(datetime).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
