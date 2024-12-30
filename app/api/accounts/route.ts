import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await sql`
        SELECT id, name, role, thumbnail_url, updated_at FROM rv_account
        ORDER BY updated_at DESC
      `;

    return NextResponse.json({ data: rows, length: rows.length, status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse('INTERNAL ERROR', { status: 500 });
  }
}

// [
//   {
//     id: '89hafjo4',
//     name: 'Admin',
//     role: 'admin',
//     thumbnailUrl:
//       'https://avatarfiles.alphacoders.com/374/thumb-1920-374826.png',
//     updatedAt: 1734801721481,
//   },
//   {
//     id: 'fh03fjaoj',
//     name: '*Shiba',
//     role: 'general',
//     thumbnailUrl:
//       'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474492LMy/avatar-cho-sieu-dang-yeu_042636860.jpg',
//     updatedAt: 1734863629113,
//   },
//   {
//     id: 'oihgva34',
//     name: '**Husky',
//     role: 'general',
//     thumbnailUrl: 'https://avatarfiles.alphacoders.com/266/266280.jpg',
//     updatedAt: 1734903824172,
//   },
// ];
