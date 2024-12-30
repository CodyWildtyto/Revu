import { sql } from '@vercel/postgres';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const updatedAt = +new Date();
    const crypticPassword = await hash(body.password, 10);
    const {
      rows: [data],
    } = await sql`
      INSERT INTO rv_account (
        name,
        password,
        role,
        thumbnail_url,
        updated_at
      ) VALUES (
        ${body.name}, 
        ${crypticPassword},
        ${body.role},
        'https://avatarfiles.alphacoders.com/266/266280.jpg',
        ${updatedAt}
      )
      RETURNING *
    `;

    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse('INTERNAL ERROR', { status: 500 });
  }
}
