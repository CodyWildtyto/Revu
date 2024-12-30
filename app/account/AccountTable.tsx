import Link from 'next/link';

import { InboxIcon } from '@/app/svgs';
import Thumbnail from '@/components/Thumbnail';
import { TAccount } from '@/types/account';
import { AccountEditButton } from './AccountEditButton';

export default function AccountTable({
  data,
  onEditSuccess,
}: {
  data: TAccount[];
  onEditSuccess: VoidFunction;
}) {
  const handleEditSuccess = () => {
    onEditSuccess?.();
  };

  return (
    <div className="overflow-y-scroll">
      <table className="table table-pin-rows">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Name</th>
            <th>Role</th>
            <th>Reviews</th>
            <th>Assignments</th>
            <th>Updated Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ updatedAt, id, name, role, thumbnailUrl }: TAccount) => {
            return (
              <tr className="hover" key={id}>
                <td>
                  <Thumbnail src={thumbnailUrl} alt={name} />
                </td>
                <td>{name}</td>
                <td>{role}</td>
                <td>-</td>
                <td>-</td>
                <td>{new Date(updatedAt!).toLocaleString()}</td>
                <td>
                  <AccountEditButton
                    data={{ id, name, role }}
                    onSuccess={handleEditSuccess}
                  />
                  <Link href={`/review/${id}`}>
                    <button
                      className="btn btn-square btn-ghost btn-sm"
                      title="Inbox"
                    >
                      <InboxIcon />
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
