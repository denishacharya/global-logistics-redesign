import { useState, KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isConnected: boolean;
}

/**
 * Chat input component with send button
 * Handles message composition and submission
 */
export const ChatInput = ({ onSendMessage, disabled, isConnected }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && isConnected) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-border bg-background">
      <div className="flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={isConnected ? "Type your message..." : "Connecting..."}
          disabled={disabled || !isConnected}
          className="flex-1"
        />
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled || !isConnected}
          size="icon"
          className="bg-primary hover:bg-primary/90"
        >
          {disabled ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
      
      {!isConnected && (
        <p className="text-xs text-destructive mt-2">
          Not connected to chat server. Attempting to reconnect...
        </p>
      )}
    </div>
  );
};
