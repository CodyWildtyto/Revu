import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
import { useCallback, useEffect, useRef, useState } from 'react';

import { API_URL } from '@/app/constants';
import { useAccounts } from '@/app/hooks';
import { FeedbackIcon } from '@/app/svgs';
import LabelSelect from '@/components/LabelSelect';
import { TAccount } from '@/types/account';
import { TReview } from '@/types/review';
import { parseAccountSelectOption } from '../parsers';

export function ReviewFeedbackButton({
  data: { article, id, target, writer },
  onSuccess,
}: {
  data: TReview;
  onSuccess?: VoidFunction;
}) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const { data: list } = useAccounts();
  const { data: session } = useSession();

  const user = session?.user as User & TAccount;
  const isWriter = writer.id === user?.id;

  const optionList = list.map(parseAccountSelectOption);

  const handleModal = () => {
    modalRef?.current?.showModal();
  };

  const handleSaveButton = async () => {
    setSaveLoading(true);

    await fetch(`${API_URL}/review`, {
      body: JSON.stringify({
        id: id,
        article: textareaRef.current?.value,
        writer_id: writer.id,
      }),
      method: 'PUT',
    });

    setSaveLoading(false);
    modalRef?.current?.close();
    onSuccess?.();
  };

  const resetForm = useCallback(() => {
    if (textareaRef.current) textareaRef.current.value = article;
  }, [article]);

  const handleModalClosed = () => {
    resetForm();
  };

  useEffect(() => {
    resetForm();
  }, [article, resetForm]);
  return (
    <>
      <button
        className="btn btn-square btn-ghost btn-sm"
        onClick={handleModal}
        title="Feedback"
      >
        <FeedbackIcon />
      </button>
      <dialog className="modal" ref={modalRef} onClose={handleModalClosed}>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="text-lg font-bold">Feedback</h3>
          <LabelSelect
            data={optionList}
            disabled
            title="Target"
            value={target.id}
          />
          <label className="form-control">
            <div className="label">
              <span className="label-text">Feedback</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-72 w-full"
              defaultValue={article}
              disabled={!isWriter}
              placeholder="Feedback"
              ref={textareaRef}
            />
          </label>
          {isWriter && (
            <button
              className="btn btn-primary btn-sm mt-8"
              disabled={saveLoading}
              onClick={handleSaveButton}
            >
              Save
              {saveLoading && <span className="loading loading-spinner" />}
            </button>
          )}
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
