import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Link, useLocation, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import ValidationRow from '@/components/ValidationRow';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useUser } from '../context/UserContext';

export default function SignIn() {
  const { login, loginWithKakao, loginWithGoogle } = useSupabaseAuth();
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigate(location.state?.from?.pathname || '/profile', { replace: true });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate(location.state?.from?.pathname || '/profile', { replace: true });
    } catch (error) {
      console.error('Sign in failed:', error);
      // 여기서 에러 메시지를 사용자에게 보여줄 수 있습니다
    }
  };

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
          <form onSubmit={handleSubmit}>
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
            <Button type='submit' className='w-full'>
              Sign in
            </Button>
          </form>
        </CardContent>

        <CardFooter className='flex justify-center gap-2'>
          <Button
            onClick={() => {
              loginWithGoogle();
            }}
            className='grow'
          >
            Sign in With Google
          </Button>
          <Button
            onClick={() => {
              loginWithKakao(null, {
                scopes: 'profile_nickname profile_image',
              });
            }}
            className='grow'
          >
            Sign in With Kakao
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
