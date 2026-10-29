'use client';
import { useState, useEffect } from 'react';

export default function FraudAlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAlerts = () => {
    fetch('/api/fraud-alerts')
      .then(r => r.json())
      .then(data => {
        setAlerts(data.alerts || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const handleResolve = async (id: string) => {
    await fetch('/api/fraud-alerts', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alert_id: id, fraud_status: 'Resolved', reviewed_by: 'Estate Manager' })
    });
    loadAlerts();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Real-Time Fraud Detection Console</h2>
          <p className="text-xs text-slate-500">Automated monitoring for Address Collisions, Duplicate NINs, and Discrepancies</p>
        </div>
        <span className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full">
          Live Rule Enforcement
        </span>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b pb-2">Flagged Suspicious Activities ({alerts.length})</h3>

        {loading ? (
          <p className="text-xs text-slate-500 py-4">Loading real-time audit queue...</p>
        ) : alerts.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-emerald-700 font-bold text-sm">✓ No Active Fraud Flags Detected</p>
            <p className="text-xs text-slate-500 mt-1">All address collision checks and NIN identity registrations are clear.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((a: any) => (
              <div key={a._id} className="p-4 border border-red-200 bg-red-50/50 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded">
                      {a.suspicious_activity_type}
                    </span>
                    <span className="text-slate-400 text-[10px]">{new Date(a.detected_date).toLocaleString()}</span>
                  </div>
                  <p className="font-semibold text-slate-900">{a.description}</p>
                  {a.duplicate_record_info && (
                    <p className="text-slate-600 bg-white p-2 rounded border text-[11px] font-mono">{a.duplicate_record_info}</p>
                  )}
                </div>
                <div>
                  {a.fraud_status === 'Flagged' ? (
                    <button onClick={() => handleResolve(a._id)} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded text-xs transition">
                      Mark Reviewed & Resolved
                    </button>
                  ) : (
                    <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2.5 py-1 rounded">
                      ✓ {a.fraud_status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
