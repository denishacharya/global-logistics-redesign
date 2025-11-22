export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
  isConnected: boolean;
}
