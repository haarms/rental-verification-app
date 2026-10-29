'use client';
import { useState, useEffect } from 'react';

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [form, setForm] = useState({
    landlord_id: '661b1c20e5871f2b4890a101',
    landlord_name: 'Chief Solomon Okafor',
    property_title: '3 Bedroom Luxury Flat in Lekki Phase 1',
    property_type: 'Apartment',
    property_location: 'Lekki, Lagos',
    property_address: '14 Admiralty Way, Lekki Phase 1, Lagos State',
    description: 'Spacious 3 bedroom flat with water treatment plant and 24/7 security.',
    number_of_rooms: 3,
    rental_price: 3500000
  });

  const loadProperties = () => {
    fetch('/api/properties')
      .then(r => r.json())
      .then(data => setProperties(data.properties || []));
  };

  useEffect(() => {
    loadProperties();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrorAlert('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.flagged) {
          setErrorAlert(`🚨 ${data.error}`);
        } else {
          setErrorAlert(data.error || 'Failed to list property');
        }
      } else {
        setSuccessMsg('✓ Property successfully listed! Address Collision Check passed.');
        loadProperties();
      }
    } catch (err: any) {
      setErrorAlert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Property Listings & Address Collision Detector</h2>
        <p className="text-xs text-slate-500">List new properties or inspect verified housing catalog (Automatic Fraud Prevention)</p>
      </div>

      {errorAlert && (
        <div className="p-4 bg-red-100 border border-red-300 text-red-800 text-sm rounded-xl font-medium space-y-1">
          <p>{errorAlert}</p>
          <p className="text-xs text-red-600 font-normal">Check the Fraud Detection Console to review flagged address collisions.</p>
        </div>
      )}

      {successMsg && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm rounded-xl font-medium">
          {successMsg}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b pb-2">List New Property</h3>
          <form onSubmit={handleSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold block text-slate-700">Landlord Name</label>
              <input type="text" className="w-full p-2 border rounded mt-1 bg-slate-50" value={form.landlord_name} onChange={e => setForm({...form, landlord_name: e.target.value})} required />
            </div>
            <div>
              <label className="font-semibold block text-slate-700">Property Title</label>
              <input type="text" className="w-full p-2 border rounded mt-1" value={form.property_title} onChange={e => setForm({...form, property_title: e.target.value})} required />
            </div>
            <div>
              <label className="font-semibold block text-slate-700">Property Address (Collision Monitored)</label>
              <textarea className="w-full p-2 border rounded mt-1 font-mono text-xs" rows={2} value={form.property_address} onChange={e => setForm({...form, property_address: e.target.value})} required />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold block text-slate-700">Rooms</label>
                <input type="number" className="w-full p-2 border rounded mt-1" value={form.number_of_rooms} onChange={e => setForm({...form, number_of_rooms: Number(e.target.value)})} />
              </div>
              <div>
                <label className="font-semibold block text-slate-700">Rent (₦/yr)</label>
                <input type="number" className="w-full p-2 border rounded mt-1" value={form.rental_price} onChange={e => setForm({...form, rental_price: Number(e.target.value)})} />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition text-xs mt-2">
              {loading ? 'Running Address Collision Check...' : 'Submit Property for Verification'}
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b pb-2">Active Property Catalog ({properties.length})</h3>
          {properties.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">No properties listed yet. Fill out the form to add a property.</p>
          ) : (
            <div className="space-y-3">
              {properties.map((p: any) => (
                <div key={p._id} className="p-4 border rounded-xl bg-slate-50 flex justify-between items-start text-xs">
                  <div className="space-y-1">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {p.property_status}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{p.property_title}</h4>
                    <p className="text-slate-600">📍 {p.property_address}</p>
                    <p className="text-slate-400">Landlord: {p.landlord_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-extrabold text-slate-900">₦{p.rental_price?.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400">Rooms: {p.number_of_rooms}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
