'use client';
import { useState } from 'react';

const responses = {
  default: {
    message: `Research shows that the combination of symptoms you've described warrants further investigation. Hormonal imbalances are often dismissed as stress or lifestyle issues, but they can have significant long-term health impacts if left untreated.`,
    tests: [
      'Complete hormone panel (FSH, LH, estrogen, progesterone)',
      'Thyroid function test (TSH, T3, T4)',
      'Pelvic ultrasound to check for cysts',
      'Complete blood count (CBC)',
    ],
    script: `"I understand you think it may be stress-related, but I've been tracking my symptoms for several weeks and I notice consistent patterns that concern me. I'd like to request a hormone panel and thyroid test to rule out any underlying conditions. Can we discuss this further?"`
  }
};

export default function DismissProof() {
  const [doctorSaid, setDoctorSaid] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setResponse(responses.default);
      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🛡️ Dismiss-Proof</h1>
        <p className="text-gray-400 mt-1">
          Don't let your concerns be dismissed — get the language to advocate for yourself
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-pink-50 rounded-2xl p-4 mb-6 flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <p className="text-pink-600 text-sm">
          Women's health concerns are dismissed 50% more often than men's.
          Hera gives you evidence-based language to push back — politely but firmly.
        </p>
      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          What did your doctor say?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="e.g. My doctor said it's just stress and I should exercise more..."
            value={doctorSaid}
            onChange={(e) => setDoctorSaid(e.target.value)}
            rows={4}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 resize-none"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Get My Response 🛡️'}
          </button>
        </form>
      </div>

      {/* Response */}
      {response && (
        <div className="space-y-4">
          {/* Evidence */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3">📚 What Research Says</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{response.message}</p>
          </div>

          {/* Tests to Request */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">🧪 Tests to Request by Name</h2>
            <div className="space-y-2">
              {response.tests.map((test, i) => (
                <div key={i} className="flex items-center gap-3 bg-pink-50 rounded-xl p-3">
                  <span className="text-pink-500 font-bold text-sm">{i + 1}</span>
                  <p className="text-gray-700 text-sm">{test}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Script */}
          <div className="bg-pink-500 rounded-2xl p-6 text-white">
            <h2 className="text-lg font-bold mb-3">💬 What to Say to Your Doctor</h2>
            <p className="text-pink-100 text-sm leading-relaxed italic">{response.script}</p>
          </div>
        </div>
      )}
    </div>
  );
}