import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { login } from '../api';

export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await login(formData);
      localStorage.setItem('auth_token', response.token);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
      if (error.response?.data) {
        setErrors(error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Username"
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          error={errors.username}
          required
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </Link>
          </div>
        </div>

        <Button type="submit" isLoading={isLoading}>
          Sign in
        </Button>

        <div className="text-sm text-center">
          <span className="text-gray-600">Don't have an account?</span>{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}