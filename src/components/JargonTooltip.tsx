import React, { useState } from 'react';
import { HelpCircle, Sparkles, AlertCircle, Info, X } from 'lucide-react';
import { getJargon } from '../utils/jargonTooltips';

interface JargonTooltipProps {
  termKey: string;
  children?: React.ReactNode;
  inline?: boolean;
}

export const JargonTooltip: React.FC<JargonTooltipProps> = ({ termKey, children, inline = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const info = getJargon(termKey);

  if (!info) {
    return <span>{children || termKey}</span>;
  }

  return (
    <span className="relative inline-flex items-center gap-1 group">
      {children ? (
        <span className="cursor-help border-b border-dashed border-sky-400 font-medium text-neutral-900 hover:text-sky-600 transition-colors">
          {children}
        </span>
      ) : (
        <span className="cursor-help border-b border-dashed border-sky-400 font-medium text-neutral-900 hover:text-sky-600 transition-colors">
          {info.simpleName}
        </span>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-0.5 text-sky-600 hover:text-sky-700 hover:bg-sky-50 rounded-full transition-colors"
        title="Click for simple, jargon-free explanation"
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs md:absolute md:inset-auto md:bottom-full md:left-1/2 md:-translate-x-1/2 md:mb-2 md:w-80 md:bg-transparent md:p-0 md:backdrop-blur-none"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white rounded-xl shadow-2xl border border-neutral-200 p-4 text-left animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-2 border-b border-neutral-100 pb-2.5 mb-2.5">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3" /> Jargon-Free Guide
                </span>
                <h4 className="font-bold text-sm text-neutral-900 mt-1">{info.term}</h4>
                <p className="text-xs font-medium text-sky-600">{info.simpleName}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-neutral-600">
              <div>
                <span className="font-semibold text-neutral-800 block mb-0.5">What is it?</span>
                <p className="leading-relaxed">{info.definition}</p>
              </div>

              <div className="bg-sky-50/70 p-2.5 rounded-lg border border-sky-100">
                <span className="font-semibold text-sky-900 flex items-center gap-1 mb-1">
                  <Info className="w-3.5 h-3.5 text-sky-600 shrink-0" /> Simple Analogy:
                </span>
                <p className="text-sky-950 leading-relaxed italic">{info.plainAnalogy}</p>
              </div>

              <div>
                <span className="font-semibold text-neutral-800 block mb-0.5">Why HawkSpectra tests it:</span>
                <p className="leading-relaxed text-neutral-700">{info.whyItMatters}</p>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-neutral-100 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs font-semibold text-neutral-700 hover:text-neutral-900 px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 rounded-md transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </span>
  );
};
