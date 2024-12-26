import clsx from 'clsx';

import NavButton from './NavButton';

export default function Nav({
  className,
}: Readonly<{
  className?: string;
}>) {
  return (
    <nav className={clsx(['min-w-48 pl-12', className])}>
      <h1 className="mb-8 grow">Rev:u</h1>
      <div>
        <NavButton href="/review">Review</NavButton>
        <NavButton href="/account">Account</NavButton>
        <NavButton href="/">Logout</NavButton>
      </div>
    </nav>
  );
}
