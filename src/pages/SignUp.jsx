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

export default function SignUp() {
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
            <Button className='w-full'>Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter>
          <span>소셜 회원가입 자리</span>
        </CardFooter>
      </Card>
    </main>
  );
}
