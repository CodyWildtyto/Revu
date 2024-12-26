import clsx from 'clsx';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function Thumbnail({
  alt,
  children,
  className,
  size = 24,
  src,
}: Readonly<{
  alt: string;
  children?: ReactNode;
  className?: string;
  size?: number;
  src: string;
}>) {
  return (
    <>
      <Image
        className={clsx('inline-block rounded-2xl', className)}
        src={src}
        alt={alt}
        width={size}
        height={size}
      />
      {children ? children : ''}
    </>
  );
}
