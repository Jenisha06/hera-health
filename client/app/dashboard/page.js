'use client';
import { useAuth } from '../../src/context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Good morning, {user?.name} 🌸
        </h1>
        <p className="text-gray-400 mt-1">How are you feeling today?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-400 mb-1">Health Score</p>
          <p className="text-4xl font-bold text-pink-500">85</p>
          <p className="text-xs text-gray-400 mt-1">Based on your recent logs</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-400 mb-1">Days Logged</p>
          <p className="text-4xl font-bold text-pink-500">0</p>
          <p className="text-xs text-gray-400 mt-1">Start your first log today</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <p className="text-sm text-gray-400 mb-1">Current Streak</p>
          <p className="text-4xl font-bold text-pink-500">0</p>
          <p className="text-xs text-gray-400 mt-1">Log daily to build your streak</p>
        </div>
      </div>

      {/* Daily Check-in Prompt */}
      <div className="bg-pink-500 rounded-2xl p-6 text-white mb-6">
        <h2 className="text-xl font-bold mb-1">Daily Check-in</h2>
        <p className="text-pink-100 text-sm mb-4">
          Take 30 seconds to log how you're feeling today. Your patterns depend on it.
        </p>
         <a
          href="/log"
          className="bg-white text-pink-500 px-6 py-2 rounded-xl font-semibold text-sm hover:bg-pink-50 transition inline-block"
       >
          Log Today →
        </a>
      </div>

      {/* Tip of the Day */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-2">💡 Tip of the Day</h2>
        <p className="text-gray-500 text-sm">
          Tracking your symptoms consistently for just 2 weeks gives Hera enough data
          to start finding patterns. The more you log, the smarter your insights get.
        </p>
      </div>
    </div>
  );
}