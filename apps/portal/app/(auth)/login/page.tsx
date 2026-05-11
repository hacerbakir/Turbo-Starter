'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '@/app/shared/providers/auth-provider';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Email ve şifre zorunludur');
      return;
    }
    setLoading(true);

    try {
      if (email === 'admin@mga.com' && password === '123456') {
        login({
          name: 'Admin',
          permissions: ['flights', 'crews', 'compensation'],
        });

        router.push('/dashboard');
      } else {
        setError('Geçersiz email veya şifre');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex h-screen w-full overflow-hidden'>
      <div className='relative w-auto'>
        <img src='/images/login.svg' alt='Mavi Gök Airlines' className='w-full h-auto max-h-screen bg-primary' />
      </div>
      <div className='flex-1'>
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
          }}
        >
          <div className='space-y-5 w-2/5'>
            <div className='text-primary font-baloo font-semibold text-xl leading-5 border-b pb-8 border-[#475569]'>
              <div>Welcome to</div>
              <div className='text-2xl'>MGA Portal</div>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col w-full'>
              <TextField
                label='Email'
                placeholder='Email'
                margin='normal'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focused
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                  },
                }}
              />

              <TextField
                label='Password'
                placeholder='Password'
                type='password'
                margin='normal'
                value={password}
                focused
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                  },
                }}
              />

              {error && (
                <Alert severity='error' sx={{ mt: 2, width: '100%', boxSizing: 'border-box' }}>
                  {error}
                </Alert>
              )}

              <Button type='submit' variant='contained' sx={{ mt: 3, borderRadius: '16px' }} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Login'}
              </Button>
            </form>
          </div>
        </Box>
      </div>
    </div>
  );
}
