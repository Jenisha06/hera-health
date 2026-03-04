'use client';
import { useRouter } from 'next/navigation';
import { ArrowRight, Brain, Shield, Stethoscope } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex">
      {/* Left — Image */}
      <div
        className="hidden lg:block w-1/2 relative"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=1200&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12 z-10">
          <p className="text-white/60 text-sm leading-relaxed">
            "I spent 3 years being told my symptoms were just stress. 
            Hera helped me walk into my appointment with data, patterns, 
            and the right questions."
          </p>
          <p className="text-white/40 text-xs mt-3">— Early Hera user</p>
        </div>
      </div>

      {/* Right — Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-16 bg-white">
        <div className="max-w-md mx-auto w-full">

          {/* Logo */}
          <h1
            className="text-4xl font-bold text-pink-500 mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Hera
          </h1>
          <p className="text-gray-400 text-sm mb-12 tracking-wide uppercase text-xs">
            Women's Health Intelligence
          </p>

          {/* Headline */}
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-4">
            Your body has been<br />
            <span className="text-pink-500">trying to tell you</span><br />
            something.
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-10">
            Hera connects the dots between your daily symptoms, cycle, 
            mood and sleep — and turns them into insights that help you 
            get the care you deserve.
          </p>

          {/* Features */}
          <div className="space-y-4 mb-10">
            <div className="flex items-start gap-4">
              <div className="bg-pink-50 rounded-xl p-2 flex-shrink-0">
                <Brain size={18} className="text-pink-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">AI Pattern Detection</p>
                <p className="text-xs text-gray-400 mt-0.5">Finds correlations in your symptoms you'd never notice yourself</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-pink-50 rounded-xl p-2 flex-shrink-0">
                <Stethoscope size={18} className="text-pink-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Doctor Prep Sheet</p>
                <p className="text-xs text-gray-400 mt-0.5">Walk into appointments with evidence, not just feelings</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-pink-50 rounded-xl p-2 flex-shrink-0">
                <Shield size={18} className="text-pink-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Dismiss-Proof Mode</p>
                <p className="text-xs text-gray-400 mt-0.5">Evidence-based language to advocate for yourself</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/signup')}
              className="flex-1 bg-pink-500 text-white py-3.5 rounded-xl font-semibold hover:bg-pink-600 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-200"
            >
              Get Started
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => router.push('/login')}
              className="flex-1 border border-gray-200 text-gray-600 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Sign In
            </button>
          </div>

          <p className="text-center text-gray-300 text-xs mt-6">
            Built for every woman told it's just stress.
          </p>
        </div>
      </div>
    </div>
  );
}