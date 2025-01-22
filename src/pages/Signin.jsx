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
import { Button } from '@/components/ui/button';
import ValidationRow from '@/components/ValidationRow';

export default function SignIn() {
  return (
    <main className='flex items-center justify-center h-full px-4 grow'>
      <Card className='w-full h-min lg:w-4/5 max-w-[800px]'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>Sign In</CardTitle>
          <CardDescription className='text-center'>
            Don't have an acount?{' '}
            <Link to={'/signup'} className='underline'>
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action=''>
            <ValidationRow name='Email' type='email' />
            <ValidationRow name='Password' type='password' />
            <Button className='w-full'>Sign in</Button>
          </form>
        </CardContent>
        <CardFooter>
          <span>소셜 로그인 자리</span>
        </CardFooter>
      </Card>
    </main>
  );
}
