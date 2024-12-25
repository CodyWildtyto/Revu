import Link from 'next/link';
import { ReactNode } from 'react';

import { NavLayout } from '../layout';

function NavButton({
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

export default function Navigation() {
  return (
    <NavLayout>
      <div className="mb-8 grow text-6xl text-white">Rev:u</div>
      <div>
        <NavButton href="/reviews">Reviews</NavButton>
        <NavButton href="/employees">Employees</NavButton>
        <NavButton href="/">Logout</NavButton>
      </div>
    </NavLayout>
  );
}
