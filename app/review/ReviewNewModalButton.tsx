import { ChangeEvent, ChangeEventHandler, useRef, useState } from 'react';

import { useAccounts } from '@/app/hooks';
import { TAccount } from '@/types/account';

export function ReviewNewModalButton({}) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [reviewerValue, setReviewerValue] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const { data: list } = useAccounts();

  const handleModal = () => {
    modalRef?.current?.showModal();
  };

  const handleReviewerSelect = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setReviewerValue(target.value);
  };

  const handleTargetSelect = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setTargetValue(target.value);
  };

  const handleCreate = () => {
    modalRef?.current?.close();
  };

  return (
    <>
      <button
        className="btn btn-square btn-sm absolute right-8 top-8"
        onClick={handleModal}
      >
        <PlusSvg />
      </button>
      <dialog id="my_modal_2" className="modal" ref={modalRef}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create review</h3>
          <LabelSelect
            data={list}
            onChange={handleReviewerSelect}
            value={reviewerValue}
          />
          <LabelSelect
            data={list}
            onChange={handleTargetSelect}
            value={targetValue}
          />
          <button
            className="btn btn-primary btn-sm mt-8"
            onClick={handleCreate}
            disabled={!reviewerValue || !targetValue}
          >
            Create
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

function PlusSvg() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 50 50"
      stroke="currentColor"
    >
      <line
        fill="none"
        stroke="#000000"
        strokeMiterlimit="10"
        strokeWidth="4"
        x1="8"
        x2="41"
        y1="25"
        y2="25"
      />
      <line
        fill="none"
        stroke="#000000"
        strokeMiterlimit="10"
        strokeWidth="4"
        x1="25"
        x2="25"
        y1="8"
        y2="41"
      />
    </svg>
  );
}

function LabelSelect({
  data: list,
  onChange,
  value,
}: {
  data: TAccount[];
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
}) {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">Target</span>
      </div>
      <select
        className="select select-bordered w-full max-w-xs"
        onChange={onChange}
        value={value}
      >
        <option disabled value="">
          -
        </option>
        {list.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}
