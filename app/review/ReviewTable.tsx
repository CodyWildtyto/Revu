import { User } from 'next-auth';
import { useSession } from 'next-auth/react';

import Thumbnail from '@/components/Avatar';
import { TAccount } from '@/types/account';
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
  const { data: session } = useSession();

  const user = session?.user as User & TAccount;
  const isAdmin = user?.role === 'admin';

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
                    src={item.target.thumbnailUrl}
                    alt={item.target.name}
                  >
                    {item.target.name}
                  </Thumbnail>
                </td>
                <td>
                  <Thumbnail
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
                  {isAdmin && (
                    <ReviewEditButton
                      data={item}
                      onSuccess={handleEditSuccess}
                    />
                  )}
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
