import clsx from 'clsx';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { API_URL } from '@/app/constants';
import { useAccounts } from '@/app/hooks';
import { EditIcon } from '@/app/svgs';
import LabelSelect from '@/components/LabelSelect';
import { TReview } from '@/types/review';
import { parseAccountSelectOption } from '../parsers';

export function ReviewEditButton({
  data: { article, id, target, writer },
  onSuccess,
}: {
  data: TReview;
  onSuccess?: VoidFunction;
}) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [writerValue, setWriterValue] = useState(writer.id);
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);
  const { data: list } = useAccounts();

  const optionList = list.map(parseAccountSelectOption);

  const resetForm = useCallback(() => {
    if (selectRef.current) selectRef.current.value = writer.id;
    if (textareaRef.current) textareaRef.current.value = article;
    setIsDeleteConfirming(false);
  }, [article, writer.id]);

  const handleModal = () => {
    modalRef?.current?.showModal();
  };

  const handleModalClosed = () => {
    resetForm();
  };

  const handleWriterSelect = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setWriterValue(target.value);
  };

  const handleSaveButton = async () => {
    setSaveLoading(true);

    await fetch(`${API_URL}/review`, {
      body: JSON.stringify({
        id: id,
        article: textareaRef.current?.value,
        writer_id: writerValue,
      }),
      method: 'PUT',
    });

    setSaveLoading(false);
    modalRef?.current?.close();
    onSuccess?.();
  };

  const handleCancelButton = () => {
    modalRef?.current?.close();
  };

  const handleDeleteButton = async () => {
    if (isDeleteConfirming) {
      setDeleteLoading(true);

      await fetch(`${API_URL}/review/${id}`, {
        method: 'DELETE',
      });

      setDeleteLoading(false);
      modalRef?.current?.close();
      onSuccess?.();
      setIsDeleteConfirming(false);
    } else setIsDeleteConfirming(true);
  };

  useEffect(() => {
    resetForm();
  }, [article, resetForm, writer.id]);

  return (
    <>
      <button
        className="btn btn-square btn-ghost btn-sm"
        onClick={handleModal}
        title="Edit"
      >
        <EditIcon />
      </button>
      <dialog className="modal" ref={modalRef} onClose={handleModalClosed}>
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="text-lg font-bold">Edit Review</h3>
          <LabelSelect
            data={optionList}
            onChange={handleWriterSelect}
            ref={selectRef}
            title="Writer"
            value={writerValue}
          />
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
              placeholder="Feedback"
              ref={textareaRef}
            />
          </label>
          <button
            className="btn btn-primary btn-sm mt-8"
            onClick={handleSaveButton}
            disabled={!writerValue || !target.id}
          >
            Save
            {saveLoading && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </button>
          <button
            className="btn btn-ghost btn-sm ml-2 mt-8"
            onClick={handleCancelButton}
          >
            Cancel
          </button>
          <button
            className={clsx(
              'btn btn-ghost btn-sm ml-2 mt-8',
              isDeleteConfirming && 'btn-outline btn-error',
            )}
            onClick={handleDeleteButton}
          >
            {isDeleteConfirming ? 'Confirm Delete' : 'Delete'}
            {isDeleteConfirming && deleteLoading && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </button>
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
