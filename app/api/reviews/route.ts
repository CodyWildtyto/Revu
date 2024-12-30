import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { getServerSession, User } from 'next-auth';

import { parseReviewDBRow } from '@/app/parsers';
import { TReviewDBRow } from '@/types/review';
import { TAccount } from '@/types/account';
import authOptions from '../auth/[...nextauth]/authOptions';

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session?.user as User & TAccount;
  const userIdOrNull = user?.role !== 'admin' ? user?.id : null;

  try {
    const { rows } = await sql<TReviewDBRow>`
      SELECT 
        rv_review.*,
        rv_account_target.name AS target_name, 
        rv_account_target.thumbnail_url AS target_thumbnail_url, 
        rv_account_writer.name AS writer_name,
        rv_account_writer.thumbnail_url AS writer_thumbnail_url
      FROM rv_review 
      JOIN rv_account AS rv_account_target 
      ON rv_review.target_id = rv_account_target.id::text
      JOIN rv_account AS rv_account_writer 
      ON rv_review.writer_id = rv_account_writer.id::text
      WHERE rv_review.writer_id = COALESCE(${userIdOrNull}, rv_review.writer_id)
        OR rv_review.target_id = COALESCE(${userIdOrNull}, rv_review.target_id) 
      ORDER BY rv_review.updated_at DESC;
    `;
    const response = rows.map(parseReviewDBRow);

    return NextResponse.json({
      data: response,
      length: response.length,
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return new NextResponse('INTERNAL ERROR', { status: 500 });
  }
}

// [
//   {
//     article:
//       'The Shiba Inu is a breed of hunting dog from Japan. A small-to-medium breed, it is the smallest of the six original dog breeds native to Japan. Its name literally translates to "brushwood dog", as it is used to flush game. A small, alert, and agile dog that copes very well with mountainous terrain and hiking trails, the Shiba Inu was originally bred for hunting. It looks similar to other Japanese dog breeds such as the Akita Inu or Hokkaido, but the Shiba Inu is a different breed with a distinct bloodline, temperament, and smaller size than other Japanese dog breeds.',
//     assigner: {
//       id: '89hafjo4',
//       name: 'Admin',
//       thumbnailUrl:
//         'https://avatarfiles.alphacoders.com/374/thumb-1920-374826.png',
//     },
//     writer: {
//       id: 'fh03fjaoj',
//       name: 'Shiba',
//       thumbnailUrl:
//         'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474492LMy/avatar-cho-sieu-dang-yeu_042636860.jpg',
//     },
//     id: 'lhga389hf',
//     status: 'draft',
//     target: {
//       id: 'oihgva34',
//       name: 'Husky',
//       thumbnailUrl: 'https://avatarfiles.alphacoders.com/266/266280.jpg',
//     },
//     updatedAt: 1734961716437,
//   },
//   {
//     article:
//       'Husky is a general term for a dog used in the polar regions, primarily and specifically for work as sled dogs. It refers to a traditional northern type, notable for its cold-weather tolerance and overall hardiness. Modern racing huskies that maintain arctic breed traits (also known as Alaskan huskies) represent an ever-changing crossbreed of the fastest dogs.\nHuskies have continued to be used in sled-dog racing, as well as expedition and trek style tour businesses, and as a means of essential transportation in rural communities. Huskies are also kept as pets, and groups work to find new pet homes for retired racing and adventure-trekking dogs.',
//     assigner: {
//       id: '89hafjo4',
//       name: 'Admin',
//       thumbnailUrl:
//         'https://avatarfiles.alphacoders.com/374/thumb-1920-374826.png',
//     },
//     writer: {
//       id: 'oihgva34',
//       name: 'Husky',
//       thumbnailUrl: 'https://avatarfiles.alphacoders.com/266/266280.jpg',
//     },
//     id: 'oiaf3jee',
//     status: 'draft',
//     target: {
//       id: 'fh03fjaoj',
//       name: 'Shiba',
//       thumbnailUrl:
//         'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474492LMy/avatar-cho-sieu-dang-yeu_042636860.jpg',
//     },
//     updatedAt: 1734971866231,
//   },
// ]
