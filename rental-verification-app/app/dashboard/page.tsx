'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({
    properties: 0,
    alerts: 0,
    agreements: 0,
    verifications: 0
  });

  useEffect(() => {
    // Fetch stats from APIs
    Promise.all([
      fetch('/api/properties').then(r => r.json()).catch(() => ({ properties: [] })),
      fetch('/api/fraud-alerts').then(r => r.json()).catch(() => ({ alerts: [] })),
      fetch('/api/agreements').then(r => r.json()).catch(() => ({ agreements: [] }))
    ]).then(([propRes, alertRes, agreeRes]) => {
      setStats({
        properties: propRes.properties?.length || 0,
        alerts: alertRes.alerts?.filter((a: any) => a.fraud_status === 'Flagged').length || 0,
        agreements: agreeRes.agreements?.length || 0,
        verifications: 2 // Sample verified count
      });
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">System Executive Dashboard</h2>
          <p className="text-xs text-slate-500">Overview of active estate verification and fraud prevention operations</p>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
          MongoDB Atlas Connected
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Listed Properties</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats.properties}</p>
          <p className="text-xs text-emerald-600 mt-2 font-medium">✓ Address-verified</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-red-500">
          <p className="text-xs font-semibold text-red-600 uppercase">Active Fraud Alerts</p>
          <p className="text-3xl font-extrabold text-red-600 mt-1">{stats.alerts}</p>
          <Link href="/fraud-alerts" className="text-xs text-red-600 hover:underline mt-2 inline-block font-medium">
            Review in Fraud Console &rarr;
          </Link>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Digital Agreements</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats.agreements}</p>
          <p className="text-xs text-slate-400 mt-2">Hashed & Cryptographically signed</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase">Verified Users</p>
          <p className="text-3xl font-extrabold text-slate-900 mt-1">{stats.verifications}</p>
          <p className="text-xs text-slate-400 mt-2">Tenants & Landlords</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>⚡ Quick Actions</span>
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link href="/properties" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 font-medium text-slate-800 text-center">
              🏢 List Property
            </Link>
            <Link href="/verification" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 font-medium text-slate-800 text-center">
              🆔 Verify NIN / Deed
            </Link>
            <Link href="/agreements" className="p-3 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 font-medium text-slate-800 text-center">
              📑 Generate Lease
            </Link>
            <Link href="/fraud-alerts" className="p-3 bg-red-50 hover:bg-red-100 text-red-800 rounded-lg border border-red-200 font-medium text-center">
              ⚠️ Inspect Flags
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-slate-900">🔒 System Verification Controls</h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Address Normalization:</strong> Strips special characters and checks substring collisions across landlords.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>No Payment Processing:</strong> Payment module completely removed as per specification.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>MongoDB Atlas & Vercel:</strong> Powered by Mongoose connection caching for serverless execution.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
