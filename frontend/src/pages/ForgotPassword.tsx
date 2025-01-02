import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { forgotPassword } from '../api';

export function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await forgotPassword(email);
      setSuccess(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to send reset instructions';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent password reset instructions to your email"
      >
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Didn't receive the email? Check your spam folder or{' '}
            <button
              onClick={() => setSuccess(false)}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              try again
            </button>
          </p>
          <div className="mt-6">
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Return to sign in
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send you reset instructions"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          required
        />

        <Button type="submit" isLoading={isLoading}>
          Send reset instructions
        </Button>

        <div className="text-sm text-center">
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Return to sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}