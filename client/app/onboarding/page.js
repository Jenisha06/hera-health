'use client';
import { useState } from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Onboarding() {
  const [form, setForm] = useState({
    age: '',
    lastPeriodDate: '',
    initialSymptoms: []
  });
  const [error, setError] = useState('');
  const { token } = useAuth();
  const router = useRouter();

  const symptomOptions = [
    'Irregular periods', 'Painful cramps', 'Fatigue',
    'Bloating', 'Acne', 'Hair fall', 'Weight gain',
    'Mood swings', 'Low energy', 'Sleep issues'
  ];

  const toggleSymptom = (symptom) => {
    setForm(prev => ({
      ...prev,
      initialSymptoms: prev.initialSymptoms.includes(symptom)
        ? prev.initialSymptoms.filter(s => s !== symptom)
        : [...prev.initialSymptoms, symptom]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/user/onboarding',
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-pink-500 mb-1">🌸 Welcome to Hera</h1>
        <p className="text-gray-500 mb-6">Let's get to know you a little better</p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Age */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Age</label>
            <input
              type="number"
              placeholder="e.g. 20"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400"
              required
            />
          </div>

          {/* Last Period Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Last Period Start Date</label>
            <input
              type="date"
              value={form.lastPeriodDate}
              onChange={(e) => setForm({ ...form, lastPeriodDate: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400"
              required
            />
          </div>

          {/* Initial Symptoms */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              What symptoms have you noticed lately? <span className="text-gray-400 font-normal">(select all that apply)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {symptomOptions.map(symptom => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                    form.initialSymptoms.includes(symptom)
                      ? 'bg-pink-500 text-white border-pink-500'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition"
          >
            Let's Get Started →
          </button>
        </form>
      </div>
    </div>
  );
}