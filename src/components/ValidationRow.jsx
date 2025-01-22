import React from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useState } from 'react';

export default function ValidationRow({ name, type, err = null }) {
  const [input, setInput] = useState('');

  return (
    <div className='mb-2'>
      <Label htmlFor={name}>{name}</Label>
      <Input
        id={name}
        type={type}
        placeholder={name}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
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
