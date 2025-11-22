import { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage } from '@/types/chat';

interface UseWebSocketChatReturn {
  messages: ChatMessage[];
  isConnected: boolean;
  sendMessage: (content: string) => void;
  clearHistory: () => void;
  error: string | null;
}

/**
 * Custom hook to manage WebSocket chat connection and messages
 * Handles connection lifecycle, message sending/receiving, and error states
 */
export const useWebSocketChat = (websocketUrl: string): UseWebSocketChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const sessionIdRef = useRef<string>(
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );

  // Initialize WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      try {
        const ws = new WebSocket(websocketUrl);
        
        ws.onopen = () => {
          console.log('WebSocket connected');
          setIsConnected(true);
          setError(null);
          
          // Send session initialization
          ws.send(JSON.stringify({
            type: 'init',
            sessionId: sessionIdRef.current
          }));
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            // Handle streaming response
            if (data.type === 'message' || data.role === 'assistant') {
              const newMessage: ChatMessage = {
                id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                role: data.role || 'assistant',
                content: data.content || data.message,
                timestamp: new Date()
              };
              
              setMessages(prev => [...prev, newMessage]);
            }
          } catch (err) {
            console.error('Error parsing message:', err);
          }
        };

        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          setError('Connection error. Please check if the server is running.');
          setIsConnected(false);
        };

        ws.onclose = () => {
          console.log('WebSocket disconnected');
          setIsConnected(false);
          setError('Disconnected from chat server');
          
          // Attempt reconnection after 3 seconds
          setTimeout(() => {
            if (wsRef.current?.readyState === WebSocket.CLOSED) {
              connectWebSocket();
            }
          }, 3000);
        };

        wsRef.current = ws;
      } catch (err) {
        console.error('Error creating WebSocket:', err);
        setError('Failed to connect to chat server');
      }
    };

    connectWebSocket();

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [websocketUrl]);

  /**
   * Send a message through the WebSocket connection
   */
  const sendMessage = useCallback((content: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      setError('Not connected to chat server');
      return;
    }

    // Add user message to local state immediately
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Send to WebSocket
    try {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        sessionId: sessionIdRef.current,
        message: content,
        role: 'user'
      }));
    } catch (err) {
      console.error('Error sending message:', err);
      setError('Failed to send message');
    }
  }, []);

  /**
   * Clear chat history
   */
  const clearHistory = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isConnected,
    sendMessage,
    clearHistory,
    error
  };
};
