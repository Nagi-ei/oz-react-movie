import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ValidationRow({
  name,
  type,
  data,
  setData,
  password = null,
}) {
  const [err, setErr] = useState(null);

  const isValid = () => {
    switch (name) {
      case 'Email':
        if (!data.includes('@') || !data.includes('.')) {
          setErr('Email is not valid');
        } else {
          setErr(null);
        }
        break;
      case 'Password':
        if (data.length < 8) {
          setErr('Password must be at least 8 characters');
        } else {
          setErr(null);
        }
        break;
      case 'Confirm Password':
        if (data !== password) {
          setErr('Passwords do not match');
        } else {
          setErr(null);
        }
        break;
    }
  };

  useEffect(() => {
    isValid();
  }, [data]);

  return (
    <div className='mb-2'>
      <Label htmlFor={name}>{name}</Label>
      <Input
        id={name}
        type={type}
        placeholder={name}
        value={data}
        onChange={(e) => {
          setData(e.target.value);
        }}
        className={err ? `border-2 border-rose-600 dark:border-red-900` : ' '}
      />
      {err ? (
        <p className='text-rose-600 dark:text-red-700'>{err}</p>
      ) : (
        <p className='py-3'></p>
      )}
    </div>
  );
}
