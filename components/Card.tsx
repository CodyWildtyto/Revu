import clsx from 'clsx';

export function Card({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={clsx([
        'card bg-base-100 min-w-64 p-8 pb-0 shadow-2xl',
        className,
      ])}
    >
      {children}
    </div>
  );
}
