import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { AuthLayout } from '../components/AuthLayout';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { changePassword } from '../api';

export function ChangePassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await changePassword(formData);
      toast.success('Password changed successfully');
      navigate('/dashboard');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to change password';
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
      title="Change Password"
      subtitle="Update your account password"
    >
      <div className="mb-6">
        <Button
          variant="secondary"
          className="!w-auto"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Current Password"
          type="password"
          value={formData.oldPassword}
          onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
          error={errors.oldPassword}
          required
        />

        <Input
          label="New Password"
          type="password"
          value={formData.newPassword}
          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          error={errors.newPassword}
          required
        />

        <Input
          label="Confirm New Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          error={errors.confirmPassword}
          required
        />

        <Button type="submit" isLoading={isLoading}>
          Change Password
        </Button>
      </form>
    </AuthLayout>
  );
}