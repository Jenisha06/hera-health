'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: '🏠 Dashboard', path: '/dashboard' },
    { label: '📝 Daily Log', path: '/log' },
    { label: '🌙 My Cycle', path: '/cycle' },
    { label: '🔍 Patterns', path: '/patterns' },
    { label: '👩‍⚕️ Doctor Prep', path: '/doctorprep' },
    { label: '🛡️ Dismiss-Proof', path: '/dismissproof' },
    { label: '🆘 SOS', path: '/sos' },
    { label: '📚 Resources', path: '/resources' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-pink-500">🌸 Hera</h1>
        <p className="text-sm text-gray-400 mt-1">Hi, {user?.name || 'there'} 👋</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition ${
              pathname === item.path
                ? 'bg-pink-50 text-pink-500'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-50 transition"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}