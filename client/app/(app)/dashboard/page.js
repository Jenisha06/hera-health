'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../src/context/AuthContext';
import axios from 'axios';
import { TrendingUp, Calendar, Moon, AlertTriangle, Lightbulb, FileText } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [patterns, setPatterns] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [patternsRes, logsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/patterns', { headers }),
        axios.get('http://localhost:5000/api/logs', { headers })
      ]);

      setPatterns(patternsRes.data);
      setLogs(logsRes.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const avgMood = logs.length > 0
    ? (logs.reduce((sum, l) => sum + (l.mood || 0), 0) / logs.length).toFixed(1)
    : 0;

  const avgSleep = logs.length > 0
    ? (logs.reduce((sum, l) => sum + (l.sleep || 0), 0) / logs.length).toFixed(1)
    : 0;

  const healthScore = Math.min(100, Math.round(
    (parseFloat(avgMood) / 5) * 50 +
    (parseFloat(avgSleep) / 9) * 50
  ));

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Loading your dashboard...</p>
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Good morning, {user?.name}
        </h1>
        <p className="text-gray-400 mt-1">How are you feeling today?</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-pink-400" />
            <p className="text-sm text-gray-400">Health Score</p>
          </div>
          <p className="text-4xl font-bold text-pink-500">{healthScore}</p>
          <p className="text-xs text-gray-400 mt-1">Based on your recent logs</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={18} className="text-pink-400" />
            <p className="text-sm text-gray-400">Days Logged</p>
          </div>
          <p className="text-4xl font-bold text-pink-500">{logs.length}</p>
          <p className="text-xs text-gray-400 mt-1">Keep the streak going!</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Moon size={18} className="text-pink-400" />
            <p className="text-sm text-gray-400">Avg Sleep</p>
          </div>
          <p className="text-4xl font-bold text-pink-500">{avgSleep}</p>
          <p className="text-xs text-gray-400 mt-1">hours per night</p>
        </div>
      </div>

      {/* Weekly Insight */}
      {patterns?.weeklyInsight && (
        <div className="bg-pink-500 rounded-2xl p-6 text-white mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={18} />
            <h2 className="text-lg font-bold">Weekly Insight</h2>
          </div>
          <p className="text-pink-100 text-sm">{patterns.weeklyInsight}</p>
        </div>
      )}

      {/* Risk Flags */}
      {patterns?.riskFlags?.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-orange-400" />
            <h2 className="text-lg font-bold text-gray-800">Health Flags</h2>
          </div>
          <div className="space-y-3">
            {patterns.riskFlags.map((flag, i) => (
              <div key={i} className="border border-orange-200 bg-orange-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-orange-600 text-sm">{flag.condition}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    flag.confidence === 'high' ? 'bg-red-100 text-red-500' :
                    flag.confidence === 'moderate' ? 'bg-orange-100 text-orange-500' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {flag.confidence} confidence
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{flag.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Check-in */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText size={18} className="text-pink-400" />
          <h2 className="text-lg font-bold text-gray-800">Daily Check-in</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Take 30 seconds to log how you are feeling today.
        </p>
        <a
          href="/log"
          className="bg-pink-500 text-white px-6 py-2 rounded-xl font-semibold text-sm hover:bg-pink-600 transition inline-block"
        >
          Log Today
        </a>
      </div>

      {/* Tip of the Day */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb size={18} className="text-pink-400" />
          <h2 className="text-lg font-bold text-gray-800">Tip of the Day</h2>
        </div>
        <p className="text-gray-500 text-sm">
          Tracking your symptoms consistently for just 2 weeks gives Hera enough data
          to start finding patterns. The more you log, the smarter your insights get.
        </p>
      </div>
    </div>
  );
}