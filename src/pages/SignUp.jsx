import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Link } from 'react-router';
import ValidationRow from '@/components/ValidationRow';
import { Button } from '@/components/ui/button';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useState } from 'react';

export default function SignUp() {
  const { signUp, loginWithGoogle, loginWithKakao } = useSupabaseAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <main className='flex items-center justify-center h-full px-4 grow'>
      <Card className='w-full lg:w-4/5 h-min max-w-[800px]'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>Sign Up</CardTitle>
          <CardDescription className='text-center'>
            Already have an acount?{' '}
            <Link to={'/signin'} className='underline'>
              Sign in
            </Link>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form action='/signin' onSubmit={() => signUp({ email, password })}>
            <ValidationRow
              name='Email'
              type='email'
              data={email}
              setData={setEmail}
            />
            <ValidationRow
              name='Password'
              type='password'
              data={password}
              setData={setPassword}
            />
            <ValidationRow
              name='Confirm Password'
              type='password'
              data={confirmPassword}
              setData={setConfirmPassword}
              password={password}
            />
            <Button className='w-full'>Sign Up</Button>
          </form>
        </CardContent>

        <CardFooter className='flex justify-center gap-2'>
          <Button onClick={loginWithGoogle} className='grow'>
            Sign up with Google
          </Button>
          {/* 이메일 무조건 요청해야만해서 어차피 못함 */}
          <Button
            onClick={() => {
              loginWithKakao(null, {
                scopes: 'profile_nickname profile_image',
              });
            }}
            className='grow'
          >
            Sign up With Kakao
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
