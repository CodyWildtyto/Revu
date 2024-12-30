import { ChangeEvent, useCallback, useRef, useState } from 'react';

import { API_URL, ROLE_LIST } from '@/app/constants';
import { PlusIcon } from '@/app/svgs';
import Input from '@/components/Input';
import LabelSelect from '@/components/LabelSelect';

export function AccountNewButton({ onSuccess }: { onSuccess?: VoidFunction }) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [isNameInValid, setIsNameInValid] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [roleValue, setRoleValue] = useState('general');

  const resetForm = useCallback(() => {
    setNameValue('');
    setPasswordValue('');
    setRoleValue('general');
  }, []);

  const handleModalClosed = () => {
    resetForm();
  };

  const handleModal = () => {
    modalRef?.current?.showModal();
  };

  const handleNameChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    setIsNameInValid(!/^[A-Za-z0-9_]+$/.test(value));
    setNameValue(value);
  };

  const handlePasswordChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    setIsPasswordInvalid(!/^[A-Za-z0-9]+$/.test(value));
    setPasswordValue(value);
  };

  const handleRoleSelect = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setRoleValue(target.value);
  };

  const handleCreateButton = async () => {
    setSaveLoading(true);

    await fetch(`${API_URL}/account`, {
      body: JSON.stringify({
        name: nameValue,
        password: passwordValue,
        role: roleValue,
      }),
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
      <dialog className="modal" ref={modalRef} onClose={handleModalClosed}>
        <div className="modal-box">
          <h3 className="text-lg font-bold">Create account</h3>
          <Input
            isInvalid={!!nameValue && isNameInValid}
            onChange={handleNameChange}
            title="Name"
            value={nameValue}
          />
          <Input
            isInvalid={!!passwordValue && isPasswordInvalid}
            onChange={handlePasswordChange}
            title="Password"
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
            onClick={handleCreateButton}
            disabled={
              !nameValue ||
              !passwordValue ||
              !roleValue ||
              isNameInValid ||
              isPasswordInvalid ||
              saveLoading
            }
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
