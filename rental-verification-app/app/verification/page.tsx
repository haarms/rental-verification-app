'use client';
import { useState, useEffect } from 'react';

export default function VerificationPage() {
  const [tenants, setTenants] = useState([]);
  const [landlords, setLandlords] = useState([]);

  useEffect(() => {
    fetch('/api/verification/tenant').then(r => r.json()).then(d => setTenants(d.verifications || []));
    fetch('/api/verification/landlord').then(r => r.json()).then(d => setLandlords(d.verifications || []));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Tenant & Landlord Identity Verification Portal</h2>
        <p className="text-xs text-slate-500">NIN Identity Validation & Property Title Deed Verification</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b pb-2">Landlord Title Deed Verifications</h3>
          <div className="space-y-3 text-xs">
            {landlords.length === 0 ? (
              <p className="text-slate-500">No landlord verification records found.</p>
            ) : (
              landlords.map((l: any) => (
                <div key={l._id} className="p-3 bg-slate-50 rounded-lg border flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">{l.landlord_name}</p>
                    <p className="text-slate-500">{l.ownership_information}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {l.verification_status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 border-b pb-2">Tenant Identity & Guarantor Checks</h3>
          <div className="space-y-3 text-xs">
            {tenants.length === 0 ? (
              <p className="text-slate-500">No tenant verification submissions found.</p>
            ) : (
              tenants.map((t: any) => (
                <div key={t._id} className="p-3 bg-slate-50 rounded-lg border flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">{t.tenant_name}</p>
                    <p className="text-slate-500">Occupation: {t.occupation} | Guarantor: {t.guarantor_name}</p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {t.verification_status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
