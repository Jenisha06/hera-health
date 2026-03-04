'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../src/context/AuthContext';
import api from '../../../src/utils/axios';
import { AlertCircle, CheckCircle, User, Phone, Save } from 'lucide-react';

export default function SOS() {
  const { token } = useAuth();
  const [contacts, setContacts] = useState([{ name: '', phone: '' }, { name: '', phone: '' }]);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sosTriggered, setSosTriggered] = useState(false);
  const [sosMessage, setSosMessage] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/user/me');
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
      await api.put('/user/contacts', { emergencyContacts: contacts });
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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
          setSosMessage(
            `EMERGENCY ALERT\n\nI need help! This is an automated SOS from Hera.\n\nMy current location: ${locationUrl}\n\nPlease contact me immediately.`
          );
        },
        () => {
          setSosMessage(
            `EMERGENCY ALERT\n\nI need help! This is an automated SOS from Hera.\n\nPlease contact me immediately.`
          );
        }
      );
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">SOS Safety</h1>
        <p className="text-gray-400 mt-1">One tap sends your location to trusted contacts</p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center mb-6">
        {sosTriggered ? (
          <div>
            <CheckCircle size={56} className="text-green-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-green-500 mb-2">SOS Activated!</h2>
            <p className="text-gray-400 text-sm mb-6">
              Tap below to send WhatsApp message to each contact
            </p>
            <div className="space-y-3">
              {contacts.filter(c => c.phone).map((contact, i) => (
                <a
                  key={i}
                 href={"https://wa.me/" + contact.phone.replace(/\D/g, '') + "?text=" + encodeURIComponent(sosMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition"
                >
                  <span>{contact.name || `Contact ${i + 1}`}</span>
                  <span className="text-sm">Open WhatsApp</span>
                </a>
              ))}
            </div>
            <button
              onClick={() => setSosTriggered(false)}
              className="mt-4 text-gray-400 text-sm underline"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-500 text-sm mb-6">
              Press the button below if you feel unsafe. Your current location
              will be sent to your emergency contacts immediately.
            </p>
            <button
              onClick={handleSOS}
              className="bg-red-500 text-white w-40 h-40 rounded-full font-bold hover:bg-red-600 transition shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center flex-col gap-2 mx-auto"
            >
              <AlertCircle size={36} />
              <span className="text-lg">SOS</span>
            </button>
            <p className="text-gray-400 text-xs mt-6">
              Tap once to activate SOS and alert your emergency contacts
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <User size={18} className="text-pink-400" />
          <h2 className="text-lg font-bold text-gray-800">Emergency Contacts</h2>
        </div>

        {saved && (
          <div className="bg-green-50 text-green-500 rounded-xl p-3 text-sm mb-4 flex items-center gap-2">
            <CheckCircle size={16} />
            Contacts saved successfully
          </div>
        )}

        <div className="space-y-4 mb-6">
          {contacts.map((contact, i) => (
            <div key={i} className="bg-pink-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Contact {i + 1}</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3">
                  <User size={14} className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full name"
                    value={contact.name}
                    onChange={(e) => {
                      const updated = [...contacts];
                      updated[i].name = e.target.value;
                      setContacts(updated);
                    }}
                    className="flex-1 py-2 text-sm focus:outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3">
                  <Phone size={14} className="text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Phone with country code"
                    value={contact.phone}
                    onChange={(e) => {
                      const updated = [...contacts];
                      updated[i].phone = e.target.value;
                      setContacts(updated);
                    }}
                    className="flex-1 py-2 text-sm focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSaveContacts}
          disabled={saving}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-pink-600 transition disabled:opacity-50 flex items-center gap-2"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Contacts'}
        </button>
      </div>
    </div>
  );
}