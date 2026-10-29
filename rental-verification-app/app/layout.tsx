import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Rental Agreement Verification & Fraud Detection System',
  description: 'Web-based rental agreement verification and fraud detection for estate managers, landlords, and tenants',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-slate-900 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-emerald-500 text-white p-2 rounded-lg font-bold text-xl">🛡️</div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">Rental Agreement Verification</h1>
                <p className="text-xs text-slate-400">& Fraud Detection Platform (Vercel + MongoDB)</p>
              </div>
            </div>
            <nav className="flex flex-wrap gap-2 text-sm font-medium">
              <Link href="/dashboard" className="px-3 py-1.5 rounded hover:bg-slate-800 transition">Dashboard</Link>
              <Link href="/properties" className="px-3 py-1.5 rounded hover:bg-slate-800 transition">Properties</Link>
              <Link href="/verification" className="px-3 py-1.5 rounded hover:bg-slate-800 transition">Verification</Link>
              <Link href="/agreements" className="px-3 py-1.5 rounded hover:bg-slate-800 transition">Agreements</Link>
              <Link href="/fraud-alerts" className="px-3 py-1.5 bg-red-600/80 text-white rounded hover:bg-red-600 transition flex items-center gap-1">
                ⚠️ Fraud Console
              </Link>
              <Link href="/admin/logs" className="px-3 py-1.5 rounded hover:bg-slate-800 transition text-slate-300">Audit Logs</Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
          {children}
        </main>

        <footer className="bg-slate-900 text-slate-400 py-4 text-center text-xs border-t border-slate-800">
          Rental Agreement Verification and Fraud Detection System • Vercel Cloud Serverless Stack (Next.js + MongoDB Atlas) • Payment Module Excluded
        </footer>
      </body>
    </html>
  );
}
