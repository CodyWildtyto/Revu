import Link from 'next/link';
import { MouseEvent, MouseEventHandler, ReactNode } from 'react';

export default function NavButton({
  children,
  href,
  onClick,
}: Readonly<{
  children: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
  };

  if (href)
    return (
      <Link className="mb-4 block" href={href}>
        <button className="btn btn-ghost btn-primary btn-sm btn-block justify-start p-0 pl-2">
          {children}
        </button>
      </Link>
    );

  return (
    <button
      className="btn btn-ghost btn-primary btn-sm btn-block mb-4 justify-start p-0 pl-2"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
