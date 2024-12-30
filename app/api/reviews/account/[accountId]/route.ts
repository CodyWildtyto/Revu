import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

import { parseReviewDBRow } from '@/app/parsers';
import { TReviewDBRow } from '@/types/review';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ accountId: string }> },
) {
  try {
    const { accountId } = await params;
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
      WHERE rv_review.target_id = ${accountId} OR rv_review.writer_id = ${accountId}
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
