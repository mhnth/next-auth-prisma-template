'use client';

import React, { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Spinner } from '@/components/ui';

export const SignInForm: React.FC = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [isPending, startTransition] = useTransition();
  const [err, setErr] = useState<string | null>();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (err) setErr('');
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signIn('credentials', {
        email: userData.email,
        password: userData.password,
        redirect: true,
        callbackUrl: '/',
      });
    } catch {
      console.log('Error while logging in');
    }
  };

  return (
    <div className="w-full max-w-md rounded-md bg-white p-6">
      <form
        action=""
        method="post"
        className="form"
        onSubmit={(e) => startTransition(() => onSubmit(e))}
      >
        <div className="form_input">
          <input
            className="m_input"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form_input">
          <input
            className="m_input"
            type="password"
            name="password"
            placeholder="*********"
            onChange={(e) => onInputChange(e)}
          />
        </div>

        {err && <div className="form_err">{err}</div>}

        <button type="submit" className="form_btn">
          {isPending ? <Spinner /> : 'Sign In'}
        </button>
      </form>
      <div className="form_more">
        <Link href={'/signup'}>or Sign Up</Link>
      </div>
    </div>
  );
};
