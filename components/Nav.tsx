import clsx from 'clsx';

import { User } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import { useRef } from 'react';

import { TAccount } from '@/types/account';
import NavButton from './NavButton';
import Thumbnail from './Avatar';

export default function Nav({
  className,
}: Readonly<{
  className?: string;
}>) {
  const { data: session } = useSession();
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const user = session?.user as User & TAccount;
  const isAdmin = user?.role === 'admin';

  const handleLogout = () => {
    modalRef.current?.showModal();
  };

  const handleConfirmLogout = () => {
    signOut();
  };

  const handleCancelButton = () => {
    modalRef.current?.close();
  };

  return (
    <nav className={clsx(['flex h-full min-w-48 flex-col pl-12', className])}>
      <h1 className="mb-8">Rev:u</h1>
      <div className="grow">
        <NavButton href="/review">Review</NavButton>
        {isAdmin && <NavButton href="/account">Account</NavButton>}
        <NavButton onClick={handleLogout}>Logout</NavButton>
      </div>
      {user?.id && (
        <Thumbnail
          alt={user.name}
          className="mb-2 text-white"
          src={user.thumbnailUrl}
        >
          {user.name}
        </Thumbnail>
      )}
      {user?.id && (
        <dialog className="modal" ref={modalRef}>
          <div className="modal-box">
            <h3 className="text-lg font-bold">Sign Out?</h3>
            <button
              className="btn btn-sm ml-2 mt-8"
              onClick={handleConfirmLogout}
            >
              Confirm
            </button>
            <button
              className="btn btn-ghost btn-sm ml-2 mt-8"
              onClick={handleCancelButton}
            >
              Cancel
            </button>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )}
    </nav>
  );
}
