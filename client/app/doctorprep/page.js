'use client';
import { useState } from 'react';

export default function DoctorPrep() {
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setGenerated(true);
      setLoading(false);
    }, 2000);
  };

  const handleDownload = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(233, 30, 140);
    doc.text('Hera — Doctor Prep Sheet', 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Patient Summary', 20, 35);
    doc.setFontSize(10);
    doc.text(summary, 20, 45, { maxWidth: 170 });

    doc.setFontSize(12);
    doc.text('Questions for Your Doctor', 20, 100);
    doc.setFontSize(10);
    questions.forEach((q, i) => {
      doc.text(`${i + 1}. ${q}`, 20, 110 + i * 10, { maxWidth: 170 });
    });

    doc.save('hera-doctor-prep.pdf');
  };

  const summary = `Patient has been experiencing irregular periods for the past 3 months, accompanied by fatigue, bloating, and skin breakouts. Symptoms appear to worsen 5 days before menstruation. Sleep averages 5-6 hours per night. Mood scores have been consistently low during the luteal phase. No medications currently being taken.`;

  const questions = [
    'Could these symptoms be related to a hormonal imbalance?',
    'Should I get a hormone panel test done?',
    'Is an ultrasound recommended given my irregular cycles?',
    'Could this be PCOS or thyroid related?',
    'What lifestyle changes would you recommend?',
  ];

  const highlights = [
    { icon: '📅', label: 'Cycle', value: 'Irregular — 3 months' },
    { icon: '😴', label: 'Avg Sleep', value: '5.5 hours' },
    { icon: '😐', label: 'Avg Mood', value: '2.5 / 5' },
    { icon: '⚠️', label: 'Risk Flag', value: 'Possible hormonal imbalance' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">👩‍⚕️ Doctor Prep</h1>
        <p className="text-gray-400 mt-1">
          Walk into your appointment prepared and confident
        </p>
      </div>

      {!generated ? (
        /* Generate Button */
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <p className="text-6xl mb-4">📋</p>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Generate Your Doctor Prep Sheet
          </h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
            Hera will analyze your last 4 weeks of logs and create a
            professional summary you can show your doctor
          </p>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Report 🌸'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Highlights */}
          <div className="grid grid-cols-4 gap-4">
            {highlights.map((h, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
                <p className="text-2xl mb-1">{h.icon}</p>
                <p className="text-xs text-gray-400">{h.label}</p>
                <p className="text-sm font-bold text-gray-800 mt-1">{h.value}</p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              📄 Patient Summary
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{summary}</p>
          </div>

          {/* Questions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              ❓ Questions to Ask Your Doctor
            </h2>
            <div className="space-y-3">
              {questions.map((q, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="bg-pink-100 text-pink-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-600 text-sm">{q}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <div className="flex gap-4">
            <button
              onClick={handleDownload}
              className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition"
            >
              Download as PDF 📥
            </button>
            <button
              onClick={() => setGenerated(false)}
              className="bg-white text-gray-500 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition"
            >
              Regenerate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}