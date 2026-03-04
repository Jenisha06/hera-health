'use client';
import Sidebar from '../../src/components/Sidebar';
import ProtectedRoute from '../../src/components/ProtectedRoute';

export default function AppLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex">
        <Sidebar />
        <main className="md:ml-64 flex-1 min-h-screen bg-gray-50 p-4 md:p-8 pt-16 md:pt-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}