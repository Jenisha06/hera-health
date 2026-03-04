'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import {
  Home, FileText, Moon, Search, Stethoscope,
  Shield, AlertCircle, BookOpen, LogOut
} from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: Home },
    { label: 'Daily Log', path: '/log', icon: FileText },
    { label: 'My Cycle', path: '/cycle', icon: Moon },
    { label: 'Patterns', path: '/patterns', icon: Search },
    { label: 'Doctor Prep', path: '/doctorprep', icon: Stethoscope },
    { label: 'Dismiss-Proof', path: '/dismissproof', icon: Shield },
    { label: 'SOS', path: '/sos', icon: AlertCircle },
    { label: 'Resources', path: '/resources', icon: BookOpen },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
     
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-pink-500">Hera</h1>
        <p className="text-sm text-gray-400 mt-1">Hi, {user?.name || 'there'}</p>
      </div>

      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition flex items-center gap-3 ${
                pathname === item.path
                  ? 'bg-pink-50 text-pink-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-50 transition flex items-center gap-3"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}