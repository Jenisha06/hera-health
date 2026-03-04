'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../src/context/AuthContext';
import axios from 'axios';
import { CheckCircle, Heart, Moon, Send } from 'lucide-react';

export default function DailyLog() {
  const { token } = useAuth();
  const [form, setForm] = useState({ rawInput: '', mood: 3, sleep: 7 });
  const [todayLog, setTodayLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodayLog();
  }, []);

  const fetchTodayLog = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/logs/today', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodayLog(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/logs', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess(true);
      fetchTodayLog();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const moodLabels = ['', 'Very Low', 'Low', 'Okay', 'Good', 'Great'];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Loading...</p>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Daily Log</h1>
        <p className="text-gray-400 mt-1">Tell Hera how you are feeling today</p>
      </div>

      {todayLog ? (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle size={28} className="text-green-400" />
            <div>
              <h2 className="text-lg font-bold text-gray-800">You have logged today!</h2>
              <p className="text-gray-400 text-sm">Come back tomorrow for your next log</p>
            </div>
          </div>
          <div className="bg-pink-50 rounded-xl p-4 space-y-2">
            <p className="text-sm text-gray-600"><span className="font-semibold">How you felt:</span> {todayLog.rawInput}</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Mood:</span> {moodLabels[todayLog.mood]} ({todayLog.mood}/5)</p>
            <p className="text-sm text-gray-600"><span className="font-semibold">Sleep:</span> {todayLog.sleep} hours</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle size={48} className="text-pink-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-800 mb-2">Log saved!</h2>
              <p className="text-gray-400">Hera is learning your patterns. Keep it up!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  How are you feeling today?
                </label>
                <textarea
                  placeholder="e.g. Really tired today, stomach feels bloated, mild headache..."
                  value={form.rawInput}
                  onChange={(e) => setForm({ ...form, rawInput: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 resize-none"
                  required
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Heart size={16} className="text-pink-400" />
                  <label className="text-sm font-semibold text-gray-700">
                    Mood today — {moodLabels[form.mood]} ({form.mood}/5)
                  </label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={form.mood}
                  onChange={(e) => setForm({ ...form, mood: parseInt(e.target.value) })}
                  className="w-full accent-pink-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Very low</span>
                  <span>Great</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Moon size={16} className="text-pink-400" />
                  <label className="text-sm font-semibold text-gray-700">
                    Hours of sleep — {form.sleep} hrs
                  </label>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={form.sleep}
                  onChange={(e) => setForm({ ...form, sleep: parseInt(e.target.value) })}
                  className="w-full accent-pink-500"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 hr</span>
                  <span>12 hrs</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send size={16} />
                {submitting ? 'Saving...' : 'Save Log'}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}