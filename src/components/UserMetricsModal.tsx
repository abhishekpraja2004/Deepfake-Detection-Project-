import React, { useState } from 'react';
import { 
  Users, 
  Activity, 
  Scan, 
  Globe2, 
  X, 
  Radio, 
  Clock, 
  Cpu, 
  ShieldCheck, 
  RefreshCw,
  Lock,
  KeyRound,
  Terminal
} from 'lucide-react';
import { AppTheme } from '../types';

export interface TelemetryData {
  activeUsersNow: number;
  totalUniqueVisitors: number;
  totalScansCompleted: number;
  deepfakesIntercepted: number;
  realMediaVerified: number;
  languagesUsedCount: number;
  averageLatencyMs: number;
  topRegions: { region: string; count: number; pct: number }[];
  recentActivityFeed: {
    id: string;
    action: string;
    type: 'scan' | 'visit' | 'report' | 'edge';
    timeAgo: string;
    location: string;
  }[];
}

interface UserMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: AppTheme;
  telemetry: TelemetryData;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const UserMetricsModal: React.FC<UserMetricsModalProps> = ({
  isOpen,
  onClose,
  theme,
  telemetry,
  onRefresh,
  isRefreshing = false
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'regions' | 'feed'>('overview');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return localStorage.getItem('hawkspectra_dev_authenticated') === 'true';
  });

  if (!isOpen) return null;

  const isCyber = theme === 'default';
  const isDark = theme === 'dark';

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    // Default Developer PIN: 2026 or admin or dev
    if (pinInput.trim() === '2026' || pinInput.trim().toLowerCase() === 'admin' || pinInput.trim().toLowerCase() === 'dev') {
      setIsUnlocked(true);
      setPinError(false);
      localStorage.setItem('hawkspectra_dev_authenticated', 'true');
    } else {
      setPinError(true);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    localStorage.removeItem('hawkspectra_dev_authenticated');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 ${
          isCyber 
            ? 'bg-slate-950 border-slate-800 text-white' 
            : isDark 
            ? 'bg-neutral-950 border-neutral-800 text-white' 
            : 'bg-white border-neutral-200 text-neutral-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isCyber ? 'border-slate-800/80 bg-slate-900/60' : isDark ? 'border-neutral-800 bg-neutral-900/60' : 'border-neutral-200 bg-neutral-50/80'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight flex items-center gap-2">
                  Developer Live Telemetry
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-mono bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    RESTRICTED TO DEVELOPER
                  </span>
                </h3>
              </div>
              <p className="text-xs opacity-60">
                Hidden Console • Real-time traffic, active users & anonymous scan metrics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isUnlocked && onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className={`p-2 rounded-xl border transition-all ${
                  isRefreshing ? 'animate-spin opacity-50' : 'hover:scale-105 active:scale-95'
                } ${
                  isCyber 
                    ? 'bg-slate-900 border-slate-700 text-slate-300' 
                    : isDark 
                    ? 'bg-neutral-900 border-neutral-700 text-neutral-300' 
                    : 'bg-white border-neutral-200 text-neutral-700'
                }`}
                title="Refresh Live Metrics"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className={`p-2 rounded-xl transition-colors ${
                isCyber ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : isDark ? 'hover:bg-neutral-800 text-neutral-400 hover:text-white' : 'hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN Security Check if not unlocked */}
        {!isUnlocked ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-3xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <div>
              <h4 className="text-lg font-bold">Developer Access Required</h4>
              <p className="text-xs opacity-60 mt-1 max-w-sm mx-auto">
                This panel is strictly private for the application developer to monitor user traffic and server loads.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="max-w-xs mx-auto space-y-3">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter Developer PIN (Default: 2026)"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm font-mono text-center transition-all ${
                    pinError 
                      ? 'border-red-500 bg-red-500/10 focus:ring-2 focus:ring-red-500' 
                      : isCyber 
                      ? 'bg-slate-900 border-slate-700 focus:border-sky-400' 
                      : 'bg-neutral-100 border-neutral-300 focus:border-sky-500'
                  }`}
                  autoFocus
                />
              </div>

              {pinError && (
                <p className="text-xs text-red-400 font-medium">Incorrect PIN. Hint: 2026 or dev</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <KeyRound className="w-4 h-4" />
                <span>Authenticate & View Analytics</span>
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className={`flex border-b px-6 pt-2 gap-2 text-xs font-bold ${
              isCyber ? 'border-slate-800 bg-slate-950' : isDark ? 'border-neutral-800 bg-neutral-950' : 'border-neutral-200 bg-white'
            }`}>
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'overview'
                    ? 'border-sky-500 text-sky-400'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Live Users & Scans</span>
              </button>
              <button
                onClick={() => setActiveTab('regions')}
                className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'regions'
                    ? 'border-sky-500 text-sky-400'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>Geographic Traffic</span>
              </button>
              <button
                onClick={() => setActiveTab('feed')}
                className={`pb-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'feed'
                    ? 'border-sky-500 text-sky-400'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Activity Event Stream</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {activeTab === 'overview' && (
                <>
                  {/* Highlight Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Active Users Now */}
                    <div className={`p-4 rounded-2xl border transition-all ${
                      isCyber ? 'bg-slate-900/90 border-emerald-500/30' : isDark ? 'bg-neutral-900 border-emerald-500/20' : 'bg-emerald-50/50 border-emerald-200'
                    }`}>
                      <div className="flex items-center justify-between text-xs opacity-70 mb-1">
                        <span className="font-semibold">Active Right Now</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight font-mono">
                        {telemetry.activeUsersNow}
                      </div>
                      <div className="text-[11px] opacity-60 mt-1">Live active user sessions</div>
                    </div>

                    {/* Total Unique Visitors */}
                    <div className={`p-4 rounded-2xl border ${
                      isCyber ? 'bg-slate-900/80 border-slate-800' : isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                    }`}>
                      <div className="flex items-center justify-between text-xs opacity-70 mb-1">
                        <span className="font-semibold">Total Visitors</span>
                        <Users className="w-3.5 h-3.5 text-sky-400" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-sky-400 tracking-tight font-mono">
                        {telemetry.totalUniqueVisitors.toLocaleString()}
                      </div>
                      <div className="text-[11px] opacity-60 mt-1">Unique users to date</div>
                    </div>

                    {/* Total Scans Executed */}
                    <div className={`p-4 rounded-2xl border ${
                      isCyber ? 'bg-slate-900/80 border-slate-800' : isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                    }`}>
                      <div className="flex items-center justify-between text-xs opacity-70 mb-1">
                        <span className="font-semibold">Total Scans Run</span>
                        <Scan className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-indigo-400 tracking-tight font-mono">
                        {telemetry.totalScansCompleted.toLocaleString()}
                      </div>
                      <div className="text-[11px] opacity-60 mt-1">Media files analyzed</div>
                    </div>

                    {/* Deepfakes Intercepted */}
                    <div className={`p-4 rounded-2xl border ${
                      isCyber ? 'bg-slate-900/80 border-slate-800' : isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                    }`}>
                      <div className="flex items-center justify-between text-xs opacity-70 mb-1">
                        <span className="font-semibold">Deepfakes Caught</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight font-mono">
                        {telemetry.deepfakesIntercepted.toLocaleString()}
                      </div>
                      <div className="text-[11px] opacity-60 mt-1">Synthetic flags</div>
                    </div>
                  </div>

                  {/* Secondary Engine Health */}
                  <div className={`p-4 rounded-2xl border space-y-3 ${
                    isCyber ? 'bg-slate-900/50 border-slate-800' : isDark ? 'bg-neutral-900/50 border-neutral-800' : 'bg-neutral-50/80 border-neutral-200'
                  }`}>
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span>Server Engine Health & Zero-Trace Guarantee</span>
                      <span className="font-mono text-emerald-400">Secure Volatile RAM</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                          <Globe2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold">{telemetry.languagesUsedCount} Vernacular Locales</div>
                          <div className="text-[10px] opacity-60">Bhojpuri, Hindi, Tamil, etc.</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold">{telemetry.averageLatencyMs} ms Avg Processing</div>
                          <div className="text-[10px] opacity-60">Edge & Hybrid Neural Engine</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold">Zero User Identity</div>
                          <div className="text-[10px] opacity-60">No login or PII retained</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'regions' && (
                <div className="space-y-4">
                  <p className="text-xs opacity-75 leading-relaxed">
                    Anonymous regional usage breakdown across Indian states and linguistic zones:
                  </p>

                  <div className="space-y-2.5">
                    {telemetry.topRegions.map((region, idx) => (
                      <div 
                        key={region.region}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-4 ${
                          isCyber ? 'bg-slate-900/60 border-slate-800' : isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-sky-500/15 text-sky-400 font-mono text-xs font-bold flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <span className="text-xs font-bold">{region.region}</span>
                        </div>

                        <div className="flex items-center gap-3 flex-1 max-w-xs">
                          <div className="flex-1 h-2 rounded-full bg-neutral-200/20 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full"
                              style={{ width: `${region.pct}%` }}
                            />
                          </div>
                          <span className="text-xs font-mono font-bold w-12 text-right">
                            {region.pct}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'feed' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs opacity-70">
                    <span>Recent Incoming Forensic Scans</span>
                    <span className="font-mono">Live Stream</span>
                  </div>

                  <div className="space-y-2">
                    {telemetry.recentActivityFeed.map((event) => (
                      <div 
                        key={event.id}
                        className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                          isCyber ? 'bg-slate-900/40 border-slate-800' : isDark ? 'bg-neutral-900/40 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                          <span className="font-medium">{event.action}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] opacity-60">
                          <span>{event.location}</span>
                          <span>•</span>
                          <span className="font-mono">{event.timeAgo}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`px-6 py-3 border-t flex items-center justify-between text-[11px] opacity-70 ${
              isCyber ? 'border-slate-800 bg-slate-900/80' : isDark ? 'border-neutral-800 bg-neutral-900/80' : 'border-neutral-200 bg-neutral-100/80'
            }`}>
              <button 
                onClick={handleLock}
                className="hover:text-red-400 transition-colors flex items-center gap-1 font-semibold"
              >
                <Lock className="w-3 h-3" />
                <span>Lock Console</span>
              </button>
              <span>Press <kbd className="font-mono bg-neutral-700/40 px-1.5 py-0.5 rounded">Ctrl + Shift + D</kbd> to open anytime</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
