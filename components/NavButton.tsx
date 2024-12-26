import Link from 'next/link';
import { ReactNode } from 'react';

export default function NavButton({
  children,
  href,
}: Readonly<{ children: ReactNode; href: string }>) {
  return (
    <Link className="block [&:not(:nth-of-type(1))]:mt-4" href={href}>
      <button className="btn btn-primary btn-block btn-ghost btn-sm justify-start p-0 pl-2">
        {children}
      </button>
    </Link>
  );
}
