import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import clsx from 'clsx';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rev:u',
  description: 'Do the best review!!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
export function PageLayout({
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

export function CardLayout({
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

export function NavLayout({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return <nav className={clsx(['min-w-48 pl-12', className])}>{children}</nav>;
}
