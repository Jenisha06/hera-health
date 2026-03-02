'use client';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const moodData = [
  { day: 'Day 1', mood: 3, sleep: 7 },
  { day: 'Day 2', mood: 2, sleep: 5 },
  { day: 'Day 3', mood: 4, sleep: 8 },
  { day: 'Day 4', mood: 3, sleep: 6 },
  { day: 'Day 5', mood: 2, sleep: 5 },
  { day: 'Day 6', mood: 1, sleep: 4 },
  { day: 'Day 7', mood: 3, sleep: 7 },
  { day: 'Day 8', mood: 4, sleep: 8 },
  { day: 'Day 9', mood: 5, sleep: 9 },
  { day: 'Day 10', mood: 4, sleep: 7 },
  { day: 'Day 11', mood: 3, sleep: 6 },
  { day: 'Day 12', mood: 2, sleep: 5 },
  { day: 'Day 13', mood: 1, sleep: 4 },
  { day: 'Day 14', mood: 2, sleep: 5 },
];

const symptomData = [
  { symptom: 'Fatigue', count: 8 },
  { symptom: 'Bloating', count: 6 },
  { symptom: 'Cramps', count: 5 },
  { symptom: 'Headache', count: 4 },
  { symptom: 'Acne', count: 3 },
  { symptom: 'Mood swings', count: 7 },
];

const insights = [
  { icon: '🔗', text: 'Fatigue and bloating appear together 80% of the time before your period' },
  { icon: '😴', text: 'On days you sleep less than 6 hours your mood drops by an average of 2 points' },
  { icon: '📅', text: 'Your mood is consistently lowest 5 days before your period starts' },
];

export default function Patterns() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🔍 Pattern Board</h1>
        <p className="text-gray-400 mt-1">Hera is learning your body's patterns</p>
      </div>

      {/* AI Insights */}
      <div className="bg-pink-500 rounded-2xl p-6 text-white mb-6">
        <h2 className="text-lg font-bold mb-4">✨ AI Insights</h2>
        <div className="space-y-3">
          {insights.map((insight, i) => (
            <div key={i} className="flex items-start gap-3 bg-white bg-opacity-20 rounded-xl p-3">
              <span className="text-xl">{insight.icon}</span>
              <p className="text-sm text-white">{insight.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mood & Sleep Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Mood & Sleep — Last 14 Days</h2>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="#E91E8C"
              strokeWidth={2}
              dot={{ fill: '#E91E8C', r: 4 }}
              name="Mood"
            />
            <Line
              type="monotone"
              dataKey="sleep"
              stroke="#f9a8d4"
              strokeWidth={2}
              dot={{ fill: '#f9a8d4', r: 4 }}
              name="Sleep (hrs)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Symptom Frequency Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-6">Most Frequent Symptoms</h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={symptomData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="symptom" tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
            <Tooltip />
            <Bar dataKey="count" fill="#E91E8C" radius={[6, 6, 0, 0]} name="Times logged" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Notice */}
      <div className="bg-pink-50 rounded-2xl p-4 text-center">
        <p className="text-pink-400 text-sm">
          📊 These insights get more accurate the more you log. Keep logging daily!
        </p>
      </div>
    </div>
  );
}