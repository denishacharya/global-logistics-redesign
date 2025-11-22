import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { LeadCaptureForm } from './LeadCaptureForm';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import logoTransparent from '@/assets/team-global-logo-transparent.svg';

interface ChatWindowProps {
  messages: ChatMessageType[];
  onSendMessage: (message: string) => void;
  onClose: () => void;
  isConnected: boolean;
  error: string | null;
  onClearHistory: () => void;
}

/**
 * Main chat window component
 * Displays chat history, handles lead capture, and manages chat interactions
 */
export const ChatWindow = ({ 
  messages, 
  onSendMessage, 
  onClose, 
  isConnected,
  error,
  onClearHistory 
}: ChatWindowProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Detect if user is requesting a quote or service
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === 'user') {
      const content = lastMessage.content.toLowerCase();
      const quoteKeywords = ['quote', 'price', 'cost', 'service', 'shipping', 'freight', 'contact'];
      const hasQuoteKeyword = quoteKeywords.some(keyword => content.includes(keyword));
      
      if (hasQuoteKeyword && !showLeadForm) {
        // Show lead form after assistant responds
        setTimeout(() => setShowLeadForm(true), 2000);
      }
    }
  }, [messages, showLeadForm]);

  const handleLeadSubmitSuccess = () => {
    setShowLeadForm(false);
    // Add a system message
    const systemMessage: ChatMessageType = {
      id: `msg_${Date.now()}`,
      role: 'assistant',
      content: 'Thank you for your information! Our team will contact you shortly to discuss your requirements.',
      timestamp: new Date()
    };
    // Note: You may want to add this to the messages array through a prop callback
  };

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-24 right-6 bg-background border border-border rounded-lg shadow-lg p-4 max-w-xs"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Chat Minimized</span>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMinimized(false)}
              className="h-6 w-6"
            >
              <Maximize2 className="w-3 h-3" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="h-6 w-6"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-6 right-6 w-full max-w-md h-[600px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
    >
      {/* Header */}
      <div className="bg-primary text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoTransparent} alt="Team Global Logistics" className="h-8 w-8 object-contain" />
          <div>
            <h3 className="font-semibold text-sm">Team Global Logistics</h3>
            <p className="text-xs opacity-90">
              {isConnected ? '● Online' : '○ Offline'}
            </p>
          </div>
        </div>
        
        <div className="flex gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={onClearHistory}
            className="h-8 w-8 text-white hover:bg-white/20"
            title="Clear history"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsMinimized(true)}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-2 text-xs border-b border-destructive/20">
          {error}
        </div>
      )}

      {/* Messages area */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-center p-6"
            >
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <img src={logoTransparent} alt="Logo" className="h-12 w-12 object-contain" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">
                Welcome to Team Global Logistics
              </h4>
              <p className="text-sm text-muted-foreground">
                Ask me about our shipping services, tracking, or get a custom quote!
              </p>
            </motion.div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              
              {/* Lead capture form */}
              <AnimatePresence>
                {showLeadForm && (
                  <LeadCaptureForm
                    onSubmitSuccess={handleLeadSubmitSuccess}
                    initialMessage={messages[messages.length - 1]?.content}
                  />
                )}
              </AnimatePresence>
            </>
          )}
        </AnimatePresence>
      </ScrollArea>

      {/* Input area */}
      <ChatInput
        onSendMessage={onSendMessage}
        disabled={false}
        isConnected={isConnected}
      />

      {/* Footer */}
      <div className="px-4 py-2 border-t border-border bg-muted/30 text-center">
        <p className="text-xs text-muted-foreground">
          Powered by Team Global Logistics AI Assistant
        </p>
      </div>
    </motion.div>
  );
};
