import Thumbnail from '@/components/Thumbnail';
import { TReview } from '@/types/review';
import { ReviewEditButton } from './ReviewEditButton';
import { ReviewFeedbackButton } from './ReviewFeedbackButton';

export default function ReviewTable({
  data,
  onEditSuccess,
}: {
  data: TReview[];
  onEditSuccess?: VoidFunction;
}) {
  const handleEditSuccess = () => {
    onEditSuccess?.();
  };

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr className="hover" key={item.id}>
                <td>
                  <Thumbnail
                    className="mr-2"
                    src={item.target.thumbnailUrl}
                    alt={item.target.name}
                  >
                    {item.target.name}
                  </Thumbnail>
                </td>
                <td>
                  <Thumbnail
                    className="mr-2"
                    src={item.writer.thumbnailUrl}
                    alt={item.writer.name}
                  >
                    {item.writer.name}
                  </Thumbnail>
                </td>
                <td>{item.article.slice(0, 40)}...</td>
                <td>{item.status}</td>
                <td>{new Date(item.updatedAt).toLocaleString()}</td>
                <td>
                  <ReviewEditButton data={item} onSuccess={handleEditSuccess} />
                  <ReviewFeedbackButton
                    data={item}
                    onSuccess={handleEditSuccess}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
