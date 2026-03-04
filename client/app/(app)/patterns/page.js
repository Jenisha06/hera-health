'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../src/context/AuthContext';
import api from '../../../src/utils/axios';
import { Lightbulb, Link, AlertTriangle, TrendingUp, BarChart2 } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function Patterns() {
  const { token } = useAuth();
  const [patterns, setPatterns] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatterns();
    fetchLogs();
  }, []);

  const fetchPatterns = async () => {
    try {
      const res = await api.get('/patterns');
      setPatterns(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const res = await api.get('/logs');
      setLogs(res.data.slice(0, 14).reverse());
    } catch (err) {
      console.log(err);
    }
  };

  const moodSleepData = logs.map((log, i) => ({
    day: `Day ${i + 1}`,
    mood: log.mood,
    sleep: log.sleep
  }));

  const symptomFrequency = {};
  logs.forEach(log => {
    log.parsedSymptoms?.forEach(s => {
      symptomFrequency[s.tag] = (symptomFrequency[s.tag] || 0) + 1;
    });
  });

  const symptomData = Object.entries(symptomFrequency)
    .map(([symptom, count]) => ({ symptom, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Analyzing your patterns...</p>
    </div>
  );

  return (
    <div>
    
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🔍 Pattern Board</h1>
        <p className="text-gray-400 mt-1">
          Based on your last {patterns?.logsCount || 0} days of logging
        </p>
      </div>

     
      {patterns?.logsCount < 3 ? (
        <div className="bg-pink-50 rounded-2xl p-12 text-center">
          <p className="text-5xl mb-4">📊</p>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Not enough data yet</h2>
          <p className="text-gray-400 text-sm mb-4">
            Hera needs at least 3 days of logs to find patterns. Keep logging daily!
          </p>
          <a href="/log" className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition inline-block">
            Log Today →
          </a>
        </div>
      ) : (
        <div className="space-y-6">

          
          <div className="bg-pink-500 rounded-2xl p-6 text-white">
           <div className="flex items-center gap-2 mb-2">
  <Lightbulb size={18} />
  <h2 className="text-lg font-bold">Weekly Insight</h2>
</div>
            <p className="text-pink-100 text-sm">{patterns?.weeklyInsight}</p>
          </div>

        
          {patterns?.correlations?.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
  <Link size={18} className="text-pink-400" />
  <h2 className="text-lg font-bold text-gray-800">Patterns Hera Found</h2>
</div>
              <div className="space-y-3">
                {patterns.correlations.map((c, i) => (
                  <div key={i} className="flex items-center gap-4 bg-pink-50 rounded-xl p-4">
                    <div className="bg-pink-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {Math.round(c.strength * 100)}%
                    </div>
                    <p className="text-gray-700 text-sm">{c.insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

         
          {patterns?.riskFlags?.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
  <AlertTriangle size={18} className="text-orange-400" />
  <div className="flex items-center gap-2 mb-4">
  <AlertTriangle size={18} className="text-orange-400" />
  <h2 className="text-lg font-bold text-gray-800">Health Flags</h2>
</div>
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

        
          {moodSleepData.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
  <TrendingUp size={18} className="text-pink-400" />
  <h2 className="text-lg font-bold text-gray-800">Mood & Sleep Trends</h2>
</div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={moodSleepData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="#E91E8C" strokeWidth={2} dot={{ fill: '#E91E8C', r: 4 }} name="Mood" />
                  <Line type="monotone" dataKey="sleep" stroke="#f9a8d4" strokeWidth={2} dot={{ fill: '#f9a8d4', r: 4 }} name="Sleep (hrs)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          
          {symptomData.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex items-center gap-2 mb-6">
  <BarChart2 size={18} className="text-pink-400" />
  <h2 className="text-lg font-bold text-gray-800">Most Frequent Symptoms</h2>
</div>
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
          )}

        </div>
      )}
    </div>
  );
}