import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ExternalLink, ShieldAlert, CheckCircle2 } from 'lucide-react';

const History = () => {
  const scans = [
    { id: 1, time: '2 mins ago', url: 'https://secure-login-bank.com/auth', verdict: 'PHISHING', score: '94%', type: 'URL Scan' },
    { id: 2, time: '15 mins ago', url: 'invoice_7721.pdf', verdict: 'CLEAN', score: '2%', type: 'Image Scan' },
    { id: 3, time: '1 hour ago', url: 'support@microsoft-verify.net', verdict: 'SUSPICIOUS', score: '67%', type: 'Email Scan' },
    { id: 4, time: '3 hours ago', url: 'https://google.com', verdict: 'CLEAN', score: '0%', type: 'URL Scan' },
    { id: 5, time: '5 hours ago', url: 'urgent_action_required.jpg', verdict: 'PHISHING', score: '89%', type: 'Image Scan' },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scan History</h1>
          <p className="text-textSecondary">Audit trail of all recent security assessments.</p>
        </div>
        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/10 transition-all">
          Export Audit Log
        </button>
      </div>

      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-textSecondary">Timestamp</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-textSecondary">Target Entity</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-textSecondary">Mode</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-textSecondary">Verdict</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-textSecondary text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {scans.map((scan, idx) => (
              <motion.tr
                key={scan.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-textSecondary">
                    <Clock className="w-3 h-3" />
                    {scan.time}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-textPrimary truncate max-w-[200px]" title={scan.url}>
                      {scan.url}
                    </span>
                    <ExternalLink className="w-3 h-3 text-textSecondary opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs px-2 py-1 rounded bg-white/5 text-textSecondary border border-white/5">
                    {scan.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {scan.verdict === 'PHISHING' ? (
                      <ShieldAlert className="w-4 h-4 text-red-500" />
                    ) : scan.verdict === 'CLEAN' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-amber-500/50 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                      </div>
                    )}
                    <span className={`text-xs font-bold ${
                      scan.verdict === 'PHISHING' ? 'text-red-500' : 
                      scan.verdict === 'CLEAN' ? 'text-green-500' : 'text-amber-500'
                    }`}>
                      {scan.verdict}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-mono font-bold text-textPrimary">{scan.score}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {scans.length === 0 && (
          <div className="py-20 text-center text-textSecondary italic">
            No recent activity detected. Secure perimeter active.
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
