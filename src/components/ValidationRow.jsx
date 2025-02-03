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

  const emailRegex = /[\w\-\.]+\@[\w\-\.]+/;
  // [\w] : 단어 문자(word character) - 알파벳, 숫자, 언더스코어(_)를 의미
  // 1. [\w\-\.]+ : 이메일 아이디 부분 - 알파벳,숫자,언더스코어,하이픈,점이 1회 이상
  // 2. \@ : @ 기호
  // 3. [\w\-\.]+ : 도메인 부분 - 알파벳,숫자,언더스코어,하이픈,점이 1회 이상

  const passwordRegex = /^(?=.*\d)[a-zA-Z\d]{8,}$/;
  // ^ : 문자열의 시작
  // (?=.*\d) : 전방 탐색(lookahead), .* 는 모든 문자(0개 이상), \d는 숫자를 의미
  //            -> 뒤에 숫자가 최소 1개 이상 있어야 함
  // [a-zA-Z\d] : a-z, A-Z, 숫자(0-9)만 허용
  // {8,} : 8자리 이상
  // $ : 문자열의 끝

  const isValid = () => {
    switch (name) {
      case 'Email':
        if (!emailRegex.test(data)) {
          setErr('Email is not valid');
        } else {
          setErr(null);
        }
        break;
      case 'Password':
        if (!passwordRegex.test(data)) {
          setErr('Password is not valid');
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
