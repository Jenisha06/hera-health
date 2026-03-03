'use client';
import Sidebar from '../../src/components/Sidebar';

export default function ResourcesLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen bg-gray-50 p-8">
        {children}
      </main>
    </div>
  );
}