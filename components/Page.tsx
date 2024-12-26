import clsx from 'clsx';

export default function Page({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <main className={clsx(['flex h-screen sm:p-20', className])}>
      {children}
    </main>
  );
}
