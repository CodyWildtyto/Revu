import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { API_URL, ROLE_LIST } from '@/app/constants';
import { EditIcon } from '@/app/svgs';
import LabelSelect from '@/components/LabelSelect';
import clsx from 'clsx';
import Input from '@/components/Input';

export function AccountEditButton({
  data: { id, name, role },
  onSuccess,
}: {
  data: { id: string; name: string; role?: string };
  onSuccess?: VoidFunction;
}) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [nameValue, setNameValue] = useState(name);
  const [passwordValue, setPasswordValue] = useState('');
  const [roleValue, setRoleValue] = useState(role);
  const [isDeleteConfirming, setIsDeleteConfirming] = useState(false);

  const resetForm = useCallback(() => {
    setNameValue(name);
    setPasswordValue('');
    setRoleValue(role);
  }, [name, role]);

  const handleModal = () => {
    modalRef?.current?.showModal();
  };

  const handleModalClosed = () => {
    resetForm();
  };

  const handleNameChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setNameValue(target.value);
  };

  const handlePasswordChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(target.value);
  };

  const handleRoleSelect = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setRoleValue(target.value);
  };

  const handleSaveButton = async () => {
    setSaveLoading(true);

    await fetch(`${API_URL}/account/${id}`, {
      body: JSON.stringify({
        name: nameValue,
        password: passwordValue,
        role: roleValue,
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

      await fetch(`${API_URL}/account/${id}`, {
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
  }, [name, resetForm, role]);

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
        <div className="modal-box">
          <h3 className="text-lg font-bold">Edit Account</h3>
          <Input onChange={handleNameChange} title="Name" value={nameValue} />
          <Input
            onChange={handlePasswordChange}
            title="Change Password"
            type="password"
            value={passwordValue}
          />
          <LabelSelect
            data={ROLE_LIST}
            onChange={handleRoleSelect}
            title="Role"
            value={roleValue}
          />
          <button
            className="btn btn-primary btn-sm mt-8"
            onClick={handleSaveButton}
            disabled={!nameValue || !roleValue}
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
