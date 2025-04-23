'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function SignIn() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
          <p className="text-center text-gray-500 mb-6">
            Sign in to access your chat history and continue conversations.
          </p>
          <Button
            className="w-full"
            onClick={() => signIn('google', { callbackUrl: '/chat' })}
          >
            Sign in with Google
          </Button>
        </Card>
      </div>
    </div>
  );
} 