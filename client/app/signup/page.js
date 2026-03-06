'use client';
import { useState } from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'next/navigation';

import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import axios from 'axios';
const API = 'https://hera-health.onrender.com/api';
export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API}/auth/register`, form);
      login(res.data.token, res.data.user);
      router.push('/onboarding');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div
        className="hidden lg:flex w-1/2 relative flex-col justify-end p-12"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative z-10 space-y-6">
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1">
            <p className="text-white/80 text-xs font-medium tracking-widest uppercase">
              Women's Health Intelligence
            </p>
          </div>
          <h1 className="text-5xl font-bold text-white leading-tight">
            Know your body.<br />Own your health.
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm">
            Join thousands of women who are finally connecting the dots 
            between their symptoms and their health.
          </p>
          <div className="flex gap-6 pt-2">
            <div>
              <p className="text-2xl font-bold text-white">Free</p>
              <p className="text-white/50 text-xs mt-0.5">always</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-2xl font-bold text-white">AI</p>
              <p className="text-white/50 text-xs mt-0.5">powered insights</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-2xl font-bold text-white">Private</p>
              <p className="text-white/50 text-xs mt-0.5">your data, yours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-sm">

          {/* Logo */}
          <div className="mb-10">
            <h1
              className="text-3xl font-bold text-pink-500 mb-1"
              style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.5px' }}
            >
              Hera
            </h1>
            <p className="text-gray-400 text-sm">Create your free account</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-500 rounded-xl p-3 text-sm mb-6 border border-red-100">
              <AlertCircle size={15} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 focus-within:border-pink-400 focus-within:ring-4 focus-within:ring-pink-50 transition-all bg-white">
                <User size={15} className="text-gray-300 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="flex-1 py-3.5 focus:outline-none text-sm text-gray-800 placeholder-gray-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Email
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 focus-within:border-pink-400 focus-within:ring-4 focus-within:ring-pink-50 transition-all bg-white">
                <Mail size={15} className="text-gray-300 flex-shrink-0" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="flex-1 py-3.5 focus:outline-none text-sm text-gray-800 placeholder-gray-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 focus-within:border-pink-400 focus-within:ring-4 focus-within:ring-pink-50 transition-all bg-white">
                <Lock size={15} className="text-gray-300 flex-shrink-0" />
                <input
                  type="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="flex-1 py-3.5 focus:outline-none text-sm text-gray-800 placeholder-gray-300"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 text-white py-3.5 rounded-xl font-semibold hover:bg-pink-600 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2  mt-2"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <>
                  Create Account
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <a href="/login" className="text-pink-500 font-semibold hover:underline">
                Sign in
              </a>
            </p>
          </div>

          <p className="text-center text-gray-300 text-xs mt-6">
            Built for every woman told it's just stress.
          </p>
        </div>
      </div>
    </div>
  );
}