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
import { supabase } from '@/services/supabase';

export default function SignUp() {
  const signInWithEmail = (e) => {
    e.preventDefault();
    // 유효성 검사 (비어있는 인풋에 에러 전달)
  };

  const signInWithGoogle = () => {
    supabase.auth.signInWithOAuth({ provider: 'google' });
  };

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
          <form action=''>
            <ValidationRow name='Email' type='email' />
            <ValidationRow name='Password' type='password' />
            <ValidationRow name='Confirm Password' type='password' />
            <Button onClick={signInWithEmail} className='w-full'>
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          <span>소셜 회원가입 자리</span>
        </CardFooter>
      </Card>
    </main>
  );
}
