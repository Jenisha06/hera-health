'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../src/context/AuthContext';
import api from '../../../src/utils/axios';
import { Moon, Plus, Clock, Droplets, Activity } from 'lucide-react';

export default function CycleTracker() {
  const { token } = useAuth();
  const [cycles, setCycles] = useState([]);
  const [form, setForm] = useState({
    periodStartDate: '',
    periodEndDate: '',
    flowLevel: 2,
    painLevel: 3,
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCycles();
  }, []);

  const fetchCycles = async () => {
    try {
      const res = await api.get('/cycles');
      setCycles(res.data);
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
      await api.post('/cycles',form);
      setSuccess(true);
      fetchCycles();
      setTimeout(() => setSuccess(false), 3000);
      setForm({ periodStartDate: '', periodEndDate: '', flowLevel: 2, painLevel: 3, notes: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const flowLabels = ['', 'Light', 'Medium', 'Heavy'];
  const painLabels = ['', 'Minimal', 'Mild', 'Moderate', 'Severe', 'Unbearable'];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Loading...</p>
    </div>
  );

  return (
    <div>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Cycle</h1>
        <p className="text-gray-400 mt-1">Track your period to help Hera find patterns</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Plus size={18} className="text-pink-400" />
            <h2 className="text-lg font-bold text-gray-800">Log a Period</h2>
          </div>

          {success && (
            <div className="bg-pink-50 text-pink-500 rounded-xl p-3 text-sm mb-4">
              Period logged successfully
            </div>
          )}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
              <input
                type="date"
                value={form.periodStartDate}
                onChange={(e) => setForm({ ...form, periodStartDate: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="date"
                value={form.periodEndDate}
                onChange={(e) => setForm({ ...form, periodEndDate: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Droplets size={16} className="text-pink-400" />
                <label className="text-sm font-semibold text-gray-700">
                  Flow Level — {flowLabels[form.flowLevel]}
                </label>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                value={form.flowLevel}
                onChange={(e) => setForm({ ...form, flowLevel: parseInt(e.target.value) })}
                className="w-full accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Light</span>
                <span>Medium</span>
                <span>Heavy</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Activity size={16} className="text-pink-400" />
                <label className="text-sm font-semibold text-gray-700">
                  Pain Level — {painLabels[form.painLevel]}
                </label>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={form.painLevel}
                onChange={(e) => setForm({ ...form, painLevel: parseInt(e.target.value) })}
                className="w-full accent-pink-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Minimal</span>
                <span>Unbearable</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notes <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                placeholder="Any additional notes..."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Moon size={16} />
              {submitting ? 'Saving...' : 'Log Period'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <Clock size={18} className="text-pink-400" />
            <h2 className="text-lg font-bold text-gray-800">Cycle History</h2>
          </div>
          {cycles.length === 0 ? (
            <div className="text-center py-12">
              <Moon size={40} className="text-pink-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No cycles logged yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cycles.map((cycle) => (
                <div key={cycle._id} className="bg-pink-50 rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {new Date(cycle.periodStartDate).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric'
                        })}
                        {cycle.periodEndDate && ` → ${new Date(cycle.periodEndDate).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric'
                        })}`}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Flow: {flowLabels[cycle.flowLevel]} · Pain: {painLabels[cycle.painLevel]}
                      </p>
                      {cycle.notes && <p className="text-xs text-gray-400 mt-1">{cycle.notes}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}