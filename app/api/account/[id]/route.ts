import { TAccountRow } from '@/types/account';
import { sql } from '@vercel/postgres';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const {
      rows: [data],
    } = await sql`
        SELECT id, name, role, thumbnail_url, updated_at FROM rv_account 
        WHERE id = ${id}
      `;

    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse('INTERNAL ERROR', { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body: TAccountRow & { password: string } = await req.json();

  try {
    const { id } = await params;
    const crypticPassword = body.password
      ? await hash(body.password, 10)
      : null;
    const updatedAt = +new Date();
    const {
      rows: [data],
    } = await sql`
      UPDATE rv_account SET 
        name = ${body.name},
        password = COALESCE(${crypticPassword}, password),
        role = ${body.role},
        updated_at = ${updatedAt}
      WHERE id = ${id}
      RETURNING *;
    `;

    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse('INTERNAL ERROR', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const {
      rows: [data],
    } = await sql`
        DELETE FROM rv_account
        WHERE id = ${id}
        RETURNING *;
      `;

    return NextResponse.json({ data, status: 200 });
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
