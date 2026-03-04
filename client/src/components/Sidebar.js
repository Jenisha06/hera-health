'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Home, FileText, Moon, Search, Stethoscope,
  Shield, AlertCircle, BookOpen, LogOut, Menu, X
} from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleNav = (path) => {
    router.push(path);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <>
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
              onClick={() => handleNav(item.path)}
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
    </>
  );

  return (
    <>
     
      <div className="hidden md:flex h-screen w-64 bg-white border-r border-gray-100 flex-col fixed left-0 top-0">
        <SidebarContent />
      </div>

     
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-pink-500">Hera</h1>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} className="text-gray-600" /> : <Menu size={24} className="text-gray-600" />}
        </button>
      </div>

      
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-white flex flex-col shadow-xl">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}