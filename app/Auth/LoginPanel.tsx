'use client';

import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { ChangeEvent, useState } from 'react';

import { Card } from '@/components/Card';
import Input from '@/components/Input';

export default function LoginPanel() {
  const router = useRouter();
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [isWarning, setIsWarning] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const handleNameChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (isWarning) setIsWarning(false);
    setNameValue(target.value);
  };

  const handlePasswordChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (isWarning) setIsWarning(false);
    setPasswordValue(target.value);
  };

  const handleSubmit = async () => {
    setLoginLoading(true);

    try {
      const response = await signIn('credentials', {
        name: nameValue.toLowerCase(),
        password: passwordValue,
        redirect: false,
      });

      if (!response?.error) {
        router.push('/');
        router.refresh();
      }

      if (!response?.ok) {
        setIsWarning(true);
        throw new Error('Credentials Error');
      }
    } catch (error) {
      console.error(error);
    }

    setLoginLoading(false);
  };

  return (
    <Card className="basis-96">
      <form className="card-body">
        <Input
          isInvalid={isWarning}
          title="Name"
          onChange={handleNameChange}
          value={nameValue}
        />
        <Input
          isInvalid={isWarning}
          title="Password"
          type="password"
          onChange={handlePasswordChange}
          value={passwordValue}
        />
        <div className="form-control mt-6">
          <button
            className="btn btn-primary btn-block"
            disabled={loginLoading}
            onClick={handleSubmit}
          >
            Login
            {loginLoading && (
              <span className="loading loading-spinner loading-sm" />
            )}
          </button>
        </div>
      </form>
    </Card>
  );
}
