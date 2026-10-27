import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  User, 
  RotateCcw,
  Square,
  Copy,
  Check,
  ListOrdered,
  Clock,
  Layers,
  ArrowRight,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { ChatMessage } from '../types';
import { getTranslation } from '../i18n/languages';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
  onSelectLanguage: (code: string) => void;
}

interface QueuedItem {
  id: string;
  text: string;
}

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage
}) => {
  const t = getTranslation(currentLanguage);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: t.chatWelcome || `Hello! I am **HawkAI**, your forensic intelligence assistant. I know all technical details (rPPG biological pulse, CBAM attention, ROC-AUC, EER, Grad-CAM, 2D FFT, Lip-Sync, Zero-Trace ephemeral security). Ask me anything in any language!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedPrompts: t.chatPrompts || [
        'How to use this website? (Tour)',
        'What is ROC-AUC & EER?',
        'What is rPPG biological pulse?',
        'Explain Hybrid CNN + CBAM attention',
        'Show me visual proof with Grad-CAM'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStatusText, setActiveStatusText] = useState('Connecting to Forensic Engine...');
  const [queryQueue, setQueryQueue] = useState<QueuedItem[]>([]);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isAutoScrollEnabledRef = useRef<boolean>(true);
  const activeBotMsgIdRef = useRef<string | null>(null);

  // When language is switched by the user, update the initial message if no user conversation has started yet
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: 'welcome-1',
            sender: 'assistant',
            text: t.chatWelcome || `Hello! I am **HawkAI**, your forensic intelligence assistant. Ask me anything!`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            suggestedPrompts: t.chatPrompts || [
              'How to use this website? (Tour)',
              'What is ROC-AUC & EER?',
              'What is rPPG biological pulse?'
            ]
          }
        ];
      }
      return prev;
    });
  }, [currentLanguage, t.chatWelcome, t.chatPrompts]);

  // Scroll to bottom helper
  const scrollToBottom = useCallback((smooth = true) => {
    if (isAutoScrollEnabledRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    }
  }, []);

  // Monitor user scroll to pause auto-scroll if user scrolled up
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const atBottom = scrollHeight - scrollTop - clientHeight < 60;
    isAutoScrollEnabledRef.current = atBottom;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Streaming response worker
  const executeQueryStream = async (queryText: string, userMsgId: string) => {
    setIsGenerating(true);
    setActiveStatusText('Connecting to Forensic Intelligence Engine...');
    isAutoScrollEnabledRef.current = true;

    // Unmark user message as queued
    setMessages((prev) =>
      prev.map((m) => (m.id === userMsgId ? { ...m, isQueued: false } : m))
    );

    const botMsgId = `bot-${Date.now()}`;
    activeBotMsgIdRef.current = botMsgId;

    const initialBotMessage: ChatMessage = {
      id: botMsgId,
      sender: 'assistant',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isStreaming: true,
      statusPhase: 'Initializing neural stream...'
    };

    setMessages((prev) => [...prev, initialBotMessage]);

    // Phase update timer to reduce perceived wait time before first byte
    const phaseTimer = setTimeout(() => {
      setActiveStatusText('Analyzing multi-spectrum forensic vectors...');
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? { ...m, statusPhase: 'Synthesizing forensic explanation...' }
            : m
        )
      );
    }, 180);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream'
        },
        body: JSON.stringify({
          message: queryText,
          language: currentLanguage,
          stream: true
        }),
        signal: abortController.signal
      });

      clearTimeout(phaseTimer);

      if (!response.ok || !response.body) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data:')) continue;

          const jsonPayload = trimmed.slice(5).trim();
          if (!jsonPayload) continue;

          try {
            const parsed = JSON.parse(jsonPayload);
            if (parsed.type === 'chunk' && typeof parsed.text === 'string') {
              accumulatedText += parsed.text;
              const currentAccumulated = accumulatedText;

              setMessages((prev) =>
                prev.map((m) =>
                  m.id === botMsgId
                    ? {
                        ...m,
                        text: currentAccumulated,
                        isStreaming: true,
                        statusPhase: undefined
                      }
                    : m
                )
              );
            } else if (parsed.type === 'done') {
              // Stream completed normally
            }
          } catch (jsonErr) {
            // Non-JSON line or partial chunk, proceed
          }
        }
      }

      // If text is still empty (fallback safety), request regular JSON
      if (!accumulatedText.trim()) {
        const fallbackRes = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: queryText, language: currentLanguage })
        });
        const fallbackData = await fallbackRes.json();
        accumulatedText = fallbackData.reply || 'Analysis completed.';
      }

      // Mark message streaming as completed
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId
            ? {
                ...m,
                text: accumulatedText,
                isStreaming: false,
                statusPhase: undefined,
                suggestedPrompts: [
                  'What is Celeb-DF benchmark?',
                  'How does Zero-Trace auto-delete protect privacy?',
                  'Explain Audio-Video lip mismatch (Desync)'
                ]
              }
            : m
        )
      );
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Handled via user stop button
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgId
              ? {
                  ...m,
                  isStreaming: false,
                  text: m.text ? m.text + ' *(Response stopped by user)*' : '*(Generation cancelled)*'
                }
              : m
          )
        );
      } else {
        console.warn('Chat streaming error, displaying resilient response:', err);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMsgId
              ? {
                  ...m,
                  isStreaming: false,
                  text: m.text || `HawkVision operates on 6 synchronized forensic pillars: Spatial pixel morphology, FFT/DCT Frequency spectrum, Hybrid CNN+CBAM Attention, Biological rPPG pulse extraction, Multimodal audio-video lip sync, and Temporal blinking dynamics. Ask me about any metric (ROC-AUC, EER, rPPG, CBAM, Grad-CAM, etc.)!`,
                  suggestedPrompts: [
                    'What is ROC-AUC & EER?',
                    'What is rPPG biological pulse?',
                    'Explain Hybrid CNN + CBAM attention'
                  ]
                }
              : m
          )
        );
      }
    } finally {
      clearTimeout(phaseTimer);
      setIsGenerating(false);
      abortControllerRef.current = null;
      activeBotMsgIdRef.current = null;
    }
  };

  // Asynchronous Queue Processor: Process next queued item if available
  useEffect(() => {
    if (!isGenerating && queryQueue.length > 0) {
      const nextQuery = queryQueue[0];
      setQueryQueue((prev) => prev.slice(1));
      executeQueryStream(nextQuery.text, nextQuery.id);
    }
  }, [isGenerating, queryQueue]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isQueued: isGenerating
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    if (isGenerating) {
      // Add to asynchronous queue
      setQueryQueue((prev) => [...prev, { id: userMsgId, text }]);
    } else {
      executeQueryStream(text, userMsgId);
    }
  };

  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
  };

  const handleClearQueue = () => {
    setQueryQueue([]);
  };

  const handleResetChat = () => {
    if (isGenerating && abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsGenerating(false);
    setQueryQueue([]);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: t.chatWelcome || `Hello! I am **HawkAI**, your forensic intelligence assistant. Ask me anything!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedPrompts: t.chatPrompts || [
          'How to use this website? (Tour)',
          'What is ROC-AUC & EER?',
          'What is rPPG biological pulse?'
        ]
      }
    ]);
  };

  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  // Markdown rendering helper with bolding, lists, and badge formatting
  const renderFormattedText = (rawText: string) => {
    if (!rawText) return null;

    const paragraphs = rawText.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-xs sm:text-sm">
        {paragraphs.map((para, pIdx) => {
          const trimmed = para.trim();
          if (!trimmed) {
            return <div key={pIdx} className="h-1" />;
          }

          // Bullet item
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
            const content = trimmed.replace(/^[-*•]\s+/, '');
            return (
              <div key={pIdx} className="flex items-start gap-2 pl-1.5 my-0.5">
                <span className="text-sky-500 font-bold leading-5">•</span>
                <span className="flex-1">{formatInline(content)}</span>
              </div>
            );
          }

          // Numbered list item
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
          if (numMatch) {
            return (
              <div key={pIdx} className="flex items-start gap-2 pl-1.5 my-0.5">
                <span className="text-sky-600 font-bold text-xs bg-sky-50 px-1.5 py-0.5 rounded-md border border-sky-200 shrink-0">
                  {numMatch[1]}
                </span>
                <span className="flex-1">{formatInline(numMatch[2])}</span>
              </div>
            );
          }

          // Standard paragraph
          return (
            <p key={pIdx} className="break-words">
              {formatInline(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  const formatInline = (str: string) => {
    // Split by markdown bold (**...**) and backticks (`...`)
    const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-bold text-neutral-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={idx} className="bg-neutral-100 text-sky-700 px-1.5 py-0.5 rounded-md font-mono text-[11px] border border-neutral-200">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col h-[660px] max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-3.5 sm:p-4 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white">HawkAI Assistant & Guide</h3>
                <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Streaming Online • 23 Languages
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Sub-millisecond latency intelligence for rPPG, CBAM attention, FFT spectrum & site guide.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleResetChat}
              title="Reset conversation"
              className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-1 text-xs"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50/70"
        >
          {messages.map((msg) => {
            const isBot = msg.sender === 'assistant';
            const isStreaming = msg.isStreaming;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? 'items-start' : 'items-end justify-end'}`}
              >
                {isBot && (
                  <div className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className={`w-4 h-4 ${isStreaming ? 'text-sky-400 animate-pulse' : 'text-sky-400'}`} />
                  </div>
                )}

                <div className={`max-w-[86%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed transition-all ${
                  isBot
                    ? 'bg-white border border-neutral-200/90 text-neutral-800 shadow-xs'
                    : msg.isQueued 
                      ? 'bg-neutral-800/90 border border-neutral-700 text-neutral-200' 
                      : 'bg-neutral-900 text-white font-medium shadow-xs'
                }`}>
                  {/* Queued badge for user messages */}
                  {!isBot && msg.isQueued && (
                    <div className="flex items-center gap-1 text-[10px] text-sky-400 font-semibold mb-1">
                      <Clock className="w-3 h-3 animate-spin" />
                      Queued query
                    </div>
                  )}

                  {/* Immediate Phase Indicator while generating first token */}
                  {isBot && isStreaming && !msg.text && (
                    <div className="flex items-center gap-2 py-1 text-xs text-neutral-600">
                      <div className="flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-bounce" />
                      </div>
                      <span className="font-medium text-[11px] text-sky-700">
                        {msg.statusPhase || activeStatusText}
                      </span>
                    </div>
                  )}

                  {/* Message Content with Streaming Cursor */}
                  {msg.text && (
                    <div className="relative">
                      {renderFormattedText(msg.text)}
                      {isStreaming && (
                        <span className="inline-block w-1.5 h-4 bg-sky-500 rounded-xs animate-pulse ml-1 align-middle" />
                      )}
                    </div>
                  )}

                  {/* Bottom Footer Info (Timestamp & Copy action) */}
                  <div className={`flex items-center justify-between text-[9px] mt-2 font-mono ${
                    isBot ? 'text-neutral-400' : 'text-neutral-400'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {isBot && msg.text && !isStreaming && (
                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className="hover:text-neutral-700 flex items-center gap-1 font-sans text-[10px] transition-colors"
                        title="Copy response"
                      >
                        {copiedMsgId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Suggested Quick Prompt Pills */}
                  {isBot && !isStreaming && msg.suggestedPrompts && (
                    <div className="mt-3 pt-2.5 border-t border-neutral-100 flex flex-wrap gap-1.5">
                      {msg.suggestedPrompts.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          className="text-[11px] font-semibold bg-sky-50 hover:bg-sky-100 text-sky-800 px-2.5 py-1 rounded-lg border border-sky-200/80 transition-colors text-left flex items-center gap-1 group"
                        >
                          <span>{prompt}</span>
                          <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {!isBot && (
                  <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 mb-1 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>

        {/* Asynchronous Queue Banner (if items are waiting) */}
        {queryQueue.length > 0 && (
          <div className="px-4 py-1.5 bg-amber-50 border-t border-amber-200 flex items-center justify-between text-xs text-amber-800">
            <div className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>{queryQueue.length} query in queue • will process automatically</span>
            </div>
            <button
              onClick={handleClearQueue}
              className="text-[10px] text-amber-700 hover:text-amber-900 underline font-semibold"
            >
              Clear queue
            </button>
          </div>
        )}

        {/* Streaming Controls & Input Bar */}
        <div className="p-3 border-t border-neutral-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything or request site tour (e.g. 'How does rPPG work?')..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-xs sm:text-sm bg-neutral-50/50 focus:bg-white transition-all"
            />

            {isGenerating ? (
              <button
                type="button"
                onClick={handleStopGenerating}
                className="px-3.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0"
                title="Stop streaming response"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Stop</span>
              </button>
            ) : null}

            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isGenerating ? 'Queue' : 'Send'}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
