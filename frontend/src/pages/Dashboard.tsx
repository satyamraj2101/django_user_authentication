import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User as UserIcon, Key } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '../components/Button';
import type { User } from '../types/auth';
import { api } from '../api';

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile/');
        setUser(response.data);
      } catch (error) {
        toast.error('Failed to load profile');
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post('/users/logout/');
      localStorage.removeItem('auth_token');
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Hi, {user.username}! 👋
              </h1>
              <Button
                variant="secondary"
                className="!w-auto"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                to="/profile"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <div className="flex-shrink-0">
                  <UserIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">View Profile</p>
                  <p className="text-sm text-gray-500">View and manage your profile information</p>
                </div>
              </Link>

              <Link
                to="/change-password"
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <div className="flex-shrink-0">
                  <Key className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900">Change Password</p>
                  <p className="text-sm text-gray-500">Update your account password</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}