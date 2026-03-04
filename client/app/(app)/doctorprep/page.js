'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../src/context/AuthContext';
import api from '../../../src/utils/axios';
import { ClipboardList, FileText, HelpCircle, Download, RefreshCw ,Calendar , Moon, Heart , AlertTriangle} from 'lucide-react';

export default function DoctorPrep() {
  const { token } = useAuth();
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    checkExistingPrep();
  }, []);

  const checkExistingPrep = async () => {
    try {
      const res = await api.get('/doctorprep');
      if (res.data) {
        setResult({
          summary: res.data.summaryText,
          questions: res.data.questionsForDoctor,
          highlights: res.data.symptomHighlights
        });
        setGenerated(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setChecking(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
    const res = await api.post('/doctorprep/generate', {});
      setResult(res.data);
      setGenerated(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
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
    doc.text(result.summary, 20, 45, { maxWidth: 170 });

    doc.setFontSize(12);
    doc.text('Questions for Your Doctor', 20, 100);
    doc.setFontSize(10);
    result.questions.forEach((q, i) => {
      doc.text(`${i + 1}. ${q}`, 20, 110 + i * 10, { maxWidth: 170 });
    });

    doc.save('hera-doctor-prep.pdf');
  };

  if (checking) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-gray-400">Loading...</p>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Doctor Prep</h1>
        <p className="text-gray-400 mt-1">
          Walk into your appointment prepared and confident
        </p>
      </div>

      {!generated ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <p className="text-6xl mb-4">📋</p>
       <ClipboardList size={56} className="text-pink-300 mx-auto mb-4" />
<h2 className="text-xl font-bold text-gray-800 mb-2">
  Generate Your Doctor Prep Sheet
</h2>
          <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
            Hera will analyze your logs and create a professional
            summary you can show your doctor
          </p>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50"
          >
            {loading ? 'Generating with AI... 🌸' : 'Generate Report 🌸'}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Highlights */}
        {result?.highlights && (
  <div className="grid grid-cols-4 gap-4">
    {result.highlights.map((h, i) => {
      const iconMap = {
        'Cycle': <Calendar size={24} className="text-pink-400" />,
        'Avg Sleep': <Moon size={24} className="text-pink-400" />,
        'Avg Mood': <Heart size={24} className="text-pink-400" />,
        'Risk Flag': <AlertTriangle size={24} className="text-orange-400" />,
      };
      return (
        <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="flex justify-center mb-2">
            {iconMap[h.label] || <FileText size={24} className="text-pink-400" />}
          </div>
          <p className="text-xs text-gray-400">{h.label}</p>
          <p className="text-sm font-bold text-gray-800 mt-1">{h.value}</p>
        </div>
      );
    })}
  </div>
)}

         
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
  <FileText size={18} className="text-pink-400" />
  <h2 className="text-lg font-bold text-gray-800">Patient Summary</h2>
</div>
            <p className="text-gray-600 text-sm leading-relaxed">{result?.summary}</p>
          </div>

       
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
  <HelpCircle size={18} className="text-pink-400" />
  <h2 className="text-lg font-bold text-gray-800">Questions to Ask Your Doctor</h2>
</div>
            <div className="space-y-3">
              {result?.questions?.map((q, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="bg-pink-100 text-pink-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-gray-600 text-sm">{q}</p>
                </div>
              ))}
            </div>
          </div>

          
          <div className="flex gap-4">
        <button
  onClick={handleDownload}
  className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition flex items-center gap-2"
>
  <Download size={16} />
  Download as PDF
</button>
<button
  onClick={() => { setGenerated(false); setResult(null); }}
  className="bg-white text-gray-500 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition flex items-center gap-2"
>
  <RefreshCw size={16} />
  Regenerate
</button>
          </div>
        </div>
      )}
    </div>
  );
}