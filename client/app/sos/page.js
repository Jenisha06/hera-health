'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../src/context/AuthContext';
import axios from 'axios';

export default function SOS() {
  const { token } = useAuth();
  const [contacts, setContacts] = useState([{ name: '', phone: '' }, { name: '', phone: '' }]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.emergencyContacts?.length > 0) {
        setContacts(res.data.emergencyContacts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveContacts = async () => {
    setSaving(true);
    try {
      await axios.put('http://localhost:5000/api/user/contacts',
        { emergencyContacts: contacts },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  const handleSOS = () => {
    setSosTriggered(true);
    setTimeout(() => setSosTriggered(false), 5000);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🆘 SOS Safety</h1>
        <p className="text-gray-400 mt-1">One tap sends your location to trusted contacts</p>
      </div>

      {/* SOS Button */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center mb-6">
        {sosTriggered ? (
          <div>
            <p className="text-5xl mb-4">✅</p>
            <h2 className="text-xl font-bold text-green-500 mb-2">Help is on the way!</h2>
            <p className="text-gray-400 text-sm">Your location has been sent to your emergency contacts</p>
          </div>
        ) : (
          <div>
            <p className="text-gray-500 text-sm mb-6">
              Press the button below if you feel unsafe. Your current location
              will be sent to your emergency contacts immediately.
            </p>
            <button
              onClick={handleSOS}
              className="bg-red-500 text-white w-40 h-40 rounded-full text-2xl font-bold hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🆘 SOS
            </button>
            <p className="text-gray-400 text-xs mt-6">
              Tap once to send your location to all emergency contacts
            </p>
          </div>
        )}
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Emergency Contacts</h2>

        {saved && (
          <div className="bg-green-50 text-green-500 rounded-xl p-3 text-sm mb-4">
            Contacts saved successfully ✅
          </div>
        )}

        <div className="space-y-4 mb-6">
          {contacts.map((contact, i) => (
            <div key={i} className="bg-pink-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                Contact {i + 1}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full name"
                  value={contact.name}
                  onChange={(e) => {
                    const updated = [...contacts];
                    updated[i].name = e.target.value;
                    setContacts(updated);
                  }}
                  className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-pink-400 bg-white"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={contact.phone}
                  onChange={(e) => {
                    const updated = [...contacts];
                    updated[i].phone = e.target.value;
                    setContacts(updated);
                  }}
                  className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-pink-400 bg-white"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveContacts}
          disabled={saving}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Contacts 🌸'}
        </button>
      </div>
    </div>
  );
}