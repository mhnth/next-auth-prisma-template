'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { Spinner } from '@/components/ui';
import { signIn } from 'next-auth/react';
import { api } from '@/lib/custom-api';

export const SignupForm: React.FC = ({}) => {
  const [userData, setUserData] = useState({
    name: '',
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

    const signUpData = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    api
      .call('/api/signup', signUpData)
      .then((res) => {
        signIn('credentials', {
          email: signUpData.email,
          password: signUpData.password,
          redirect: true,
          callbackUrl: '/',
        });
      })
      .catch((err) => {
        console.log('ERROR Sign Up:', err);
        setErr(err.message);
      });
  };

  return (
    <div className="w-full max-w-md rounded-md bg-white p-6">
      <form
        method="post"
        className="form"
        onSubmit={(e) => startTransition(() => onSubmit(e))}
      >
        <div className="form_input">
          <input
            className="m_input"
            type="text"
            name="name"
            placeholder="Username"
            onChange={(e) => onInputChange(e)}
          />
        </div>
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
            placeholder="**********"
            onChange={(e) => onInputChange(e)}
          />
        </div>

        {err && <div className="form_err">{err}</div>}

        <button type="submit" className="form_btn">
          {isPending ? <Spinner /> : 'Sign Up'}
        </button>
      </form>

      <div className="form_more">
        <Link href={'/signin'}>or Sign In</Link>
      </div>
    </div>
  );
};
