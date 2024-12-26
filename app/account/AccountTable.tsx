import Link from 'next/link';

import Thumbnail from '@/components/Thumbnail';
import { TAccount } from '@/types/account';

export default function AccountTable({ data }: { data: TAccount[] }) {
  return (
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ datetime, id, name, role, thumbnail }: TAccount) => {
            return (
              <tr className="hover" key={id}>
                <td>
                  <Thumbnail src={thumbnail} alt={name} />
                </td>
                <td>{name}</td>
                <td>{role}</td>
                <td>-</td>
                <td>-</td>
                <td>{new Date(datetime!).toLocaleString()}</td>
                <td>
                  <Link href={`/review/${id}`}>Reviews</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
