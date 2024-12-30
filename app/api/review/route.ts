import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

import { TReviewDBRow } from '@/types/review';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const updatedAt = +new Date();
    const {
      rows: [data],
    } = await sql`
      INSERT INTO rv_review (
        article,
        status,
        target_id,
        writer_id,
        updated_at
      ) VALUES (
        '',
        'draft',
        ${body.target_id},
        ${body.writer_id},
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

export async function PUT(req: Request) {
  const body: TReviewDBRow = await req.json();

  try {
    const updatedAt = +new Date();
    const {
      rows: [data],
    } = await sql`
      UPDATE rv_review SET 
        article = ${`${body.article}`}, 
        status = ${body.article ? 'submitted' : 'draft'},
        writer_id = ${body.writer_id},
        updated_at = ${updatedAt}
      WHERE id = ${body.id}
      RETURNING *;
    `;

    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse('INTERNAL ERROR', { status: 500 });
  }
}
