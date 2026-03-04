'use client';
import { useState } from 'react';
import { useAuth } from '../../../src/context/AuthContext';
import axios from 'axios';
import { Shield, Lightbulb, FlaskConical, MessageCircle, RotateCcw, Send } from 'lucide-react';

export default function DismissProof() {
  const { token } = useAuth();
  const [doctorSaid, setDoctorSaid] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/dismissproof/generate',
        { doctorSaid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dismiss-Proof</h1>
        <p className="text-gray-400 mt-1">
          Don't let your concerns be dismissed — get the language to advocate for yourself
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-pink-50 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <Lightbulb size={22} className="text-pink-400 flex-shrink-0 mt-0.5" />
        <p className="text-pink-600 text-sm">
          Women's health concerns are dismissed 50% more often than men's.
          Hera gives you evidence-based language to push back — politely but firmly.
        </p>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle size={18} className="text-pink-400" />
          <h2 className="text-lg font-bold text-gray-800">What did your doctor say?</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="e.g. My doctor said it's just stress and I should exercise more..."
            value={doctorSaid}
            onChange={(e) => setDoctorSaid(e.target.value)}
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 resize-none"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50 flex items-center gap-2"
          >
            <Shield size={16} />
            {loading ? 'Analyzing with AI...' : 'Get My Response'}
          </button>
        </form>
      </div>

      {/* Response */}
      {response && (
        <div className="space-y-4">
          {/* Evidence */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={18} className="text-pink-400" />
              <h2 className="text-lg font-bold text-gray-800">What Research Says</h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">{response.message}</p>
          </div>

          {/* Tests */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <FlaskConical size={18} className="text-pink-400" />
              <h2 className="text-lg font-bold text-gray-800">Tests to Request by Name</h2>
            </div>
            <div className="space-y-2">
              {response.tests?.map((test, i) => (
                <div key={i} className="flex items-center gap-3 bg-pink-50 rounded-xl p-3">
                  <span className="text-pink-500 font-bold text-sm">{i + 1}</span>
                  <p className="text-gray-700 text-sm">{test}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Script */}
          <div className="bg-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <MessageCircle size={18} />
              <h2 className="text-lg font-bold">What to Say to Your Doctor</h2>
            </div>
            <p className="text-pink-100 text-sm leading-relaxed italic">{response.script}</p>
          </div>

          {/* Try again */}
          <button
            onClick={() => { setResponse(null); setDoctorSaid(''); }}
            className="bg-white text-gray-500 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition flex items-center gap-2"
          >
            <RotateCcw size={16} />
            Try Another Response
          </button>
        </div>
      )}
    </div>
  );
}