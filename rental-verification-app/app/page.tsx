import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center space-y-4">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          Cloud Deployable on Vercel
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900">
          Web-Based Rental Agreement Verification & Fraud Detection System
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed text-sm">
          A full-stack solution grounded in Information Asymmetry Theory and Fraud Triangle Theory. Eliminates duplicate property allocations, forged landlord deeds, and identity misrepresentation in urban housing management.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/dashboard" className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition shadow">
            Launch Application Dashboard
          </Link>
          <Link href="/fraud-alerts" className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition shadow">
            View Fraud Detection Console
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-2xl">🏢</div>
          <h3 className="font-bold text-slate-900">Address Collision Check</h3>
          <p className="text-xs text-slate-500">
            Automated string normalization flags duplicate listings across multiple landlord accounts before agreements are created.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-2xl">🆔</div>
          <h3 className="font-bold text-slate-900">NIN Identity Validation</h3>
          <p className="text-xs text-slate-500">
            Cross-checks National Identification Numbers during registration to stop identity impersonation and multi-account fraud.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="text-2xl">📑</div>
          <h3 className="font-bold text-slate-900">Cryptographic Agreements</h3>
          <p className="text-xs text-slate-500">
            Generates immutable digital agreement hashes for lease terms, verifying document integrity without expensive blockchain overhead.
          </p>
        </div>
      </div>
    </div>
  );
}
