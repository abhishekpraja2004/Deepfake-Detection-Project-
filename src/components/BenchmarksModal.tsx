import React from 'react';
import { 
  X, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  AlertCircle, 
  Sparkles,
  Info
} from 'lucide-react';
import { JargonTooltip } from './JargonTooltip';
import { getTranslation } from '../i18n/languages';

interface BenchmarksModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: string;
}

export const BenchmarksModal: React.FC<BenchmarksModalProps> = ({ 
  isOpen, 
  onClose,
  currentLanguage = 'en'
}) => {
  if (!isOpen) return null;

  const t = getTranslation(currentLanguage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">
                  {t.benchmarksModalTitle}
                </h3>
                <JargonTooltip termKey="Cross-Dataset" />
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {t.benchmarksModalSubtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Cross Dataset Section */}
          <div>
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-1 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sky-600 shrink-0" />
              {t.benchmarksCrossDatasetTitle}
            </h4>
            <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
              {t.benchmarksCrossDatasetSubtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-xs font-bold text-neutral-900 block">Celeb-DF (v2)</span>
                <span className="text-[10px] text-neutral-500 block mb-2">Columbia / Albany</span>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-mono">
                    <span>{t.benchmarksRocAuc}:</span>
                    <span className="font-bold text-emerald-600">99.4%</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px] text-neutral-500">
                    <span>{t.benchmarksEer}:</span>
                    <span>2.1%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-xs font-bold text-neutral-900 block">DFDC (Deepfake Challenge)</span>
                <span className="text-[10px] text-neutral-500 block mb-2">Meta / Microsoft / AWS</span>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-mono">
                    <span>{t.benchmarksRocAuc}:</span>
                    <span className="font-bold text-emerald-600">98.6%</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px] text-neutral-500">
                    <span>{t.benchmarksEer}:</span>
                    <span>3.4%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-xs font-bold text-neutral-900 block">FaceForensics++ (c23/c40)</span>
                <span className="text-[10px] text-neutral-500 block mb-2">TU Munich</span>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-mono">
                    <span>{t.benchmarksRocAuc}:</span>
                    <span className="font-bold text-emerald-600">99.8%</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px] text-neutral-500">
                    <span>{t.benchmarksEer}:</span>
                    <span>1.4%</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-xs font-bold text-neutral-900 block">WildDeepfake</span>
                <span className="text-[10px] text-neutral-500 block mb-2">Tsinghua University</span>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-mono">
                    <span>{t.benchmarksRocAuc}:</span>
                    <span className="font-bold text-emerald-600">97.9%</span>
                  </div>
                  <div className="flex justify-between font-mono text-[11px] text-neutral-500">
                    <span>{t.benchmarksEer}:</span>
                    <span>4.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Real World Robustness Section */}
          <div className="pt-4 border-t border-neutral-200">
            <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              {t.benchmarksRobustnessTitle}
            </h4>
            <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
              {t.benchmarksRobustnessSubtitle}
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-neutral-900 block">{t.benchmarksWhatsappTitle}</span>
                  <span className="text-neutral-500 text-[11px]">{t.benchmarksWhatsappDesc}</span>
                </div>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md shrink-0">
                  97.8% {t.benchmarksResilience}
                </span>
              </div>

              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-neutral-900 block">{t.benchmarksTwitterTitle}</span>
                  <span className="text-neutral-500 text-[11px]">{t.benchmarksTwitterDesc}</span>
                </div>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md shrink-0">
                  98.2% {t.benchmarksResilience}
                </span>
              </div>

              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-neutral-900 block">{t.benchmarksTiktokTitle}</span>
                  <span className="text-neutral-500 text-[11px]">{t.benchmarksTiktokDesc}</span>
                </div>
                <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md shrink-0">
                  96.5% {t.benchmarksResilience}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition-colors"
          >
            {t.benchmarksCloseBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
