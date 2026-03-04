'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <p className="text-pink-400 text-lg">Loading 🌸</p>
    </div>
  );

  if (!user) return null;

  return children;
}