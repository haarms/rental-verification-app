'use client';
import { useState, useEffect } from 'react';

export default function AdminLogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('/api/admin/logs').then(r => r.json()).then(d => setLogs(d.logs || []));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">System Security Audit Log</h2>
        <p className="text-xs text-slate-500">Immutable record of all login events, address checks, and administrative activities</p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 border-b pb-2">Recent Security Events ({logs.length})</h3>

        <div className="space-y-2 text-xs font-mono">
          {logs.length === 0 ? (
            <p className="text-slate-500 font-sans">No audit events logged yet.</p>
          ) : (
            logs.map((l: any) => (
              <div key={l._id} className="p-2.5 bg-slate-900 text-slate-200 rounded flex justify-between items-center text-[11px]">
                <div>
                  <span className="text-emerald-400 font-bold">[{l.activity_type}]</span> {l.activity_description}
                </div>
                <div className="text-slate-500 text-[10px]">
                  {new Date(l.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
