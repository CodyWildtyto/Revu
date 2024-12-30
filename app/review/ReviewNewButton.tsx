import { ChangeEvent, useRef, useState } from 'react';

import { API_URL } from '@/app/constants';
import { useAccounts } from '@/app/hooks';
import { PlusIcon } from '@/app/svgs';
import LabelSelect from '@/components/LabelSelect';
import { parseAccountSelectOption } from '../parsers';

export function ReviewNewButton({ onSuccess }: { onSuccess?: VoidFunction }) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [writerValue, setWriterValue] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const { data: list } = useAccounts();

  const optionList = list.map(parseAccountSelectOption);

  const handleModal = () => {
    modalRef?.current?.showModal();
  };

  const handleWriterSelect = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setWriterValue(target.value);
  };

  const handleTargetSelect = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setTargetValue(target.value);
  };

  const handleCreateButton = async () => {
    setSaveLoading(true);

    await fetch(`${API_URL}/review`, {
      body: JSON.stringify({ target_id: targetValue, writer_id: writerValue }),
      method: 'POST',
    });

    setSaveLoading(false);
    modalRef?.current?.close();
    onSuccess?.();
  };

  return (
    <>
      <button
        className="btn btn-square btn-sm absolute right-8 top-8"
        onClick={handleModal}
      >
        <PlusIcon />
      </button>
      <dialog className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create review</h3>
          <LabelSelect
            data={optionList}
            onChange={handleWriterSelect}
            title="Writer"
            value={writerValue}
          />
          <LabelSelect
            data={optionList}
            onChange={handleTargetSelect}
            title="Target"
            value={targetValue}
          />
          <button
            className="btn btn-primary btn-sm mt-8"
            onClick={handleCreateButton}
            disabled={!writerValue || !targetValue}
          >
            Create
            {saveLoading && (
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
