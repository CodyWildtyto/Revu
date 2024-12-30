import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const {
      rows: [data],
    } = await sql`
        DELETE FROM rv_review
        WHERE id = ${id}
        RETURNING *;
      `;

    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.log(error);

    return new NextResponse('INTERNAL ERROR', { status: 500 });
  }
}
