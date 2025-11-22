import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatWindow } from './ChatWindow';
import { useWebSocketChat } from '@/hooks/useWebSocketChat';

/**
 * Main chat widget component - collapsible chat button with full chat interface
 * This is the entry point for the AI chatbot functionality
 */
export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // WebSocket connection configuration
  // Note: Update this URL to match your backend server
  // For local development: ws://localhost:5000/ws/chat
  // For production: wss://your-domain.com/ws/chat
  const WEBSOCKET_URL = 'ws://localhost:5000/ws/chat';
  
  const { messages, isConnected, sendMessage, clearHistory, error } = useWebSocketChat(WEBSOCKET_URL);

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            messages={messages}
            onSendMessage={sendMessage}
            onClose={() => setIsOpen(false)}
            isConnected={isConnected}
            error={error}
            onClearHistory={clearHistory}
          />
        )}
      </AnimatePresence>

      {/* Floating chat button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <Button
            size="lg"
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-2xl"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Button>
          
          {/* Notification badge (if new messages when closed) */}
          {messages.length > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
            >
              {messages.filter(m => m.role === 'assistant').length}
            </motion.div>
          )}
        </motion.div>
      )}
    </>
  );
};
