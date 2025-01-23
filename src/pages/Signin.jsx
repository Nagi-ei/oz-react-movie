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
import { useState } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

export default function SignIn() {
  // const [user, setUser] = useState(null);

  // const handleSignInWithGoogle = async () => {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //   });
  //   setUser(data);
  // };

  // const handleSignOut = async () => {
  //   const data = await supabase.auth.signOut();
  //   const user = await supabase.auth.getUser();
  //   console.log(data);
  //   console.log(user);
  // };

  // console.log(user);

  const { login, logout, loginWithKakao, loginWithGoogle } = useSupabaseAuth();

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
          <Button
            onClick={() => {
              console.log(loginWithGoogle());
              loginWithGoogle();
            }}
          >
            Sign in With Google
          </Button>
          <Button onClick={loginWithKakao}>Sign in With Kakao</Button>
          <Button onClick={logout}>Sign out</Button>
          {localStorage.getItem('userInfo') ? (
            <span>로그인됨</span>
          ) : (
            <span>로그아웃됨</span>
          )}
        </CardFooter>
      </Card>
    </main>
  );
}
