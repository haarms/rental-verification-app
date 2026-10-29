'use client';
import { useState, useEffect } from 'react';

export default function AgreementsPage() {
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    fetch('/api/agreements').then(r => r.json()).then(d => setAgreements(d.agreements || []));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Digital Rental Agreement Generator</h2>
        <p className="text-xs text-slate-500">Cryptographically hashed lease terms preventing unauthorized alterations</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b pb-2">Active Rental Agreements ({agreements.length})</h3>

        {agreements.length === 0 ? (
          <p className="text-xs text-slate-500 py-4">No digital agreements executed yet.</p>
        ) : (
          <div className="space-y-3 text-xs">
            {agreements.map((a: any) => (
              <div key={a._id} className="p-4 bg-slate-50 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">
                      {a.agreement_status}
                    </span>
                    <span className="text-slate-400 font-mono text-[10px]">{a.agreement_hash}</span>
                  </div>
                  <p className="font-bold text-slate-900">Duration: {a.tenancy_duration} | Rent: ₦{a.rent_amount?.toLocaleString()}</p>
                  <p className="text-slate-500">Witness: {a.witness_info}</p>
                </div>
                <button className="px-3 py-1.5 border bg-white hover:bg-slate-100 rounded font-semibold text-slate-700 text-xs">
                  Download Agreement PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
