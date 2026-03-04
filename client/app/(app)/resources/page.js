'use client';
import { useState } from 'react';
import { BookOpen, MapPin, Filter } from 'lucide-react';

const articles = [
  {
    id: 1,
    category: 'PCOS',
    color: 'bg-blue-100 text-blue-600',
    title: 'What is PCOS and How is it Diagnosed?',
    summary: 'Polycystic Ovary Syndrome affects 1 in 10 women worldwide. It is a hormonal disorder that can cause irregular periods, excess androgen levels, and polycystic ovaries. Early diagnosis is key to managing symptoms effectively.',
    tags: ['Hormones', 'Diagnosis', 'Common'],
    readTime: '3 min read'
  },
  {
    id: 2,
    category: 'PCOS',
    color: 'bg-blue-100 text-blue-600',
    title: 'PCOS and Your Diet — What Actually Helps',
    summary: 'Research shows that a low glycemic index diet can significantly reduce PCOS symptoms. Foods that stabilize blood sugar help regulate insulin levels, which directly impacts hormone balance and period regularity.',
    tags: ['Diet', 'Lifestyle', 'Hormones'],
    readTime: '4 min read'
  },
  {
    id: 3,
    category: 'Endometriosis',
    color: 'bg-purple-100 text-purple-600',
    title: 'Endometriosis — Why it Takes 7 Years to Diagnose',
    summary: 'Endometriosis affects 1 in 9 women but takes an average of 7-10 years to diagnose. Symptoms are often dismissed as normal period pain. Understanding the signs can help you advocate for earlier diagnosis.',
    tags: ['Pain', 'Diagnosis', 'Advocacy'],
    readTime: '5 min read'
  },
  {
    id: 4,
    category: 'Thyroid',
    color: 'bg-yellow-100 text-yellow-600',
    title: 'How Thyroid Issues Affect Your Period',
    summary: 'Both hypothyroidism and hyperthyroidism can cause irregular periods, heavy bleeding, and missed cycles. Thyroid disorders are 5-8 times more common in women and are often mistaken for other conditions.',
    tags: ['Thyroid', 'Periods', 'Hormones'],
    readTime: '4 min read'
  },
  {
    id: 5,
    category: 'Mental Health',
    color: 'bg-pink-100 text-pink-600',
    title: 'The Link Between Hormones and Mental Health',
    summary: 'Hormonal fluctuations throughout the menstrual cycle directly impact serotonin and dopamine levels. Understanding this connection can help you plan your schedule around your cycle and seek help when needed.',
    tags: ['Mental Health', 'Hormones', 'Mood'],
    readTime: '4 min read'
  },
  {
    id: 6,
    category: 'Anaemia',
    color: 'bg-red-100 text-red-600',
    title: 'Iron Deficiency Anaemia in College Women',
    summary: 'Over 50% of college-going women in India are anaemic. Heavy periods, poor diet, and lack of awareness contribute to this. Symptoms like fatigue and difficulty concentrating are often dismissed as laziness.',
    tags: ['Anaemia', 'Nutrition', 'Energy'],
    readTime: '3 min read'
  },
];

const categories = ['All', 'PCOS', 'Endometriosis', 'Thyroid', 'Mental Health', 'Anaemia'];

export default function Resources() {
  const [selected, setSelected] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const filtered = selected === 'All'
    ? articles
    : articles.filter(a => a.category === selected);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Resources</h1>
        <p className="text-gray-400 mt-1">Learn about your health in plain language</p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <Filter size={16} className="text-gray-400" />
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selected === cat
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-pink-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {filtered.map(article => (
          <div
            key={article.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:border-pink-200 transition"
            onClick={() => setExpanded(expanded === article.id ? null : article.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${article.color}`}>
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-gray-400">
                <BookOpen size={12} />
                <span className="text-xs">{article.readTime}</span>
              </div>
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-2">{article.title}</h3>
            {expanded === article.id && (
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{article.summary}</p>
            )}
            <div className="flex flex-wrap gap-1 mt-2">
              {article.tags.map(tag => (
                <span key={tag} className="bg-pink-50 text-pink-400 text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Nearby Clinics Map */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={18} className="text-pink-400" />
          <h2 className="text-lg font-bold text-gray-800">Find Nearby Clinics</h2>
        </div>
        <p className="text-gray-400 text-sm mb-4">Women's health clinics and gynecologists near you</p>
       <div className="rounded-xl overflow-hidden h-72">
  <iframe
    width="100%"
    height="100%"
    frameBorder="0"
    scrolling="no"
    src="https://www.openstreetmap.org/export/embed.html?bbox=74.7,12.8,75.1,13.1&layer=mapnik&marker=12.9716,74.9800"
    style={{ border: 0 }}
  />
</div>
<p className="text-xs text-gray-400 mt-2 text-center">
  Map data from OpenStreetMap — search for gynecologists near you
</p>
<a
  href="https://www.google.com/maps/search/gynecologist+near+me"
  target="_blank"
  rel="noreferrer"
  className="mt-3 flex items-center justify-center gap-2 bg-pink-50 text-pink-500 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-pink-100 transition"
>
  
  <MapPin size={16} />
  Open Full Map Search
</a>
      </div>
    </div>
  );
}