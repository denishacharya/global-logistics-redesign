# AI Chatbot Implementation Guide

## Overview
Complete React + TypeScript chatbot component system with WebSocket integration, lead capture, and Team Global Logistics branding.

## Features
- ✅ Real-time WebSocket communication
- ✅ Session management for individual users
- ✅ Scrollable chat history
- ✅ Automatic lead detection and capture
- ✅ Contact form API integration
- ✅ Company branding (Primary: #1D3A8A, Accent: #FFA500)
- ✅ Fully responsive (desktop & mobile)
- ✅ Collapsible chat widget
- ✅ Auto-scroll to latest message
- ✅ Error handling & reconnection
- ✅ Framer Motion animations

## Components

### 1. ChatWidget (Main Entry Point)
**Location:** `src/components/chat/ChatWidget.tsx`

The collapsible chat button and main container. Manages the open/close state of the chat window.

```tsx
import { ChatWidget } from '@/components/chat/ChatWidget';

// Usage in App.tsx
<ChatWidget />
```

### 2. ChatWindow
**Location:** `src/components/chat/ChatWindow.tsx`

Main chat interface displaying messages, lead form, and input area.

### 3. ChatMessage
**Location:** `src/components/chat/ChatMessage.tsx`

Individual message component with user/assistant styling and animations.

### 4. ChatInput
**Location:** `src/components/chat/ChatInput.tsx`

Message input field with send button and connection status indicator.

### 5. LeadCaptureForm
**Location:** `src/components/chat/LeadCaptureForm.tsx`

Form that appears when user requests quotes or services. Integrates with `/api/contact` endpoint.

## Custom Hook

### useWebSocketChat
**Location:** `src/hooks/useWebSocketChat.ts`

Manages WebSocket connection, message state, and reconnection logic.

```typescript
const { 
  messages,        // Array of chat messages
  isConnected,     // Connection status
  sendMessage,     // Function to send messages
  clearHistory,    // Function to clear chat
  error            // Error state
} = useWebSocketChat('ws://localhost:5000/ws/chat');
```

## WebSocket Configuration

### Backend URL
Update the WebSocket URL in `src/components/chat/ChatWidget.tsx`:

```typescript
// Local development
const WEBSOCKET_URL = 'ws://localhost:5000/ws/chat';

// Production
const WEBSOCKET_URL = 'wss://your-domain.com/ws/chat';
```

### Message Format

**Client to Server:**
```json
{
  "type": "message",
  "sessionId": "session_123456",
  "message": "User message text",
  "role": "user"
}
```

**Server to Client:**
```json
{
  "type": "message",
  "role": "assistant",
  "content": "AI response text"
}
```

## API Integration

### Contact Form Endpoint
**URL:** `/api/contact`  
**Method:** POST

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "AI Chat Lead - Request for Quote",
  "message": "Customer inquiry details"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

## Lead Detection

The chatbot automatically detects when users mention keywords like:
- "quote"
- "price"
- "cost"
- "service"
- "shipping"
- "freight"
- "contact"

When detected, the lead capture form appears after the AI responds.

## Styling & Branding

### Colors (HSL format)
- **Primary (Navy Blue):** `hsl(219, 65%, 32%)` - #1D3A8A
- **Accent (Orange):** `hsl(38, 100%, 50%)` - #FFA500

### Fonts
- **Headings:** Poppins
- **Body:** Inter

All colors are defined in `src/index.css` using CSS variables and can be themed for light/dark mode.

## TypeScript Types
**Location:** `src/types/chat.ts`

```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
```

## Error Handling

The chatbot handles:
- WebSocket connection failures
- Automatic reconnection (3-second delay)
- Message send failures
- Lead form submission errors
- User-friendly error messages via toast notifications

## Accessibility

- Keyboard navigation support (Enter to send)
- ARIA labels on buttons
- Semantic HTML structure
- Focus management
- Screen reader friendly

## Mobile Responsiveness

- Fixed positioning at bottom-right
- Responsive width (max-width: 28rem)
- Touch-friendly buttons
- Scrollable message area
- Optimized for small screens

## System Prompt Configuration

Configure the AI assistant behavior in your WebSocket backend:

```javascript
const systemPrompt = `You are a helpful AI assistant for Team Global Logistics Pvt. Ltd.

Context:
- Company specializes in shipping, freight, logistics services
- Services include air freight, ocean freight, road transport, warehousing
- Provide tracking information and documentation assistance

Tone:
- Professional, helpful, concise, and friendly
- Escalate leads for quotes and service requests

When users ask about:
- Services → Provide brief overview and suggest getting a quote
- Pricing → Explain it depends on requirements, trigger lead capture
- Tracking → Ask for tracking number or direct to tracking page
- General inquiries → Answer helpfully and professionally
`;
```

## Installation & Setup

1. **Install Dependencies** (already included):
   - framer-motion
   - lucide-react
   - react-hook-form
   - @radix-ui components

2. **Add ChatWidget to App.tsx**:
   ```tsx
   import { ChatWidget } from './components/chat/ChatWidget';
   
   // Inside your App component
   <ChatWidget />
   ```

3. **Configure WebSocket URL** in `ChatWidget.tsx`

4. **Set up backend WebSocket server** at the configured URL

5. **Configure Contact API endpoint** at `/api/contact`

## Testing

Test the following scenarios:
- ✅ Open/close chat widget
- ✅ Send messages and receive responses
- ✅ Trigger lead form (use keywords)
- ✅ Submit lead form
- ✅ Clear chat history
- ✅ Minimize chat window
- ✅ Connection error handling
- ✅ Reconnection after disconnect
- ✅ Mobile responsiveness

## Notes

- The chatbot is already integrated into your app via `src/App.tsx`
- WebSocket URL must be updated to match your backend
- Contact API endpoint must be configured on your backend
- Session IDs are generated client-side for demo purposes
- For production, consider server-side session management
- Toast notifications require shadcn/ui toast component

## Backend Requirements

Your WebSocket backend should:
1. Accept connections at `/ws/chat`
2. Handle `init` and `message` event types
3. Maintain session state by `sessionId`
4. Stream AI responses back to client
5. Handle disconnections gracefully

Your Contact API should:
1. Accept POST requests at `/api/contact`
2. Validate email format and required fields
3. Save to database (MongoDB ContactMessage model)
4. Send email via Nodemailer to admin
5. Send auto-reply email to user
6. Return JSON response with success status

## Support

For issues or questions about the chatbot implementation, refer to:
- Component files in `src/components/chat/`
- Hook implementation in `src/hooks/useWebSocketChat.ts`
- Type definitions in `src/types/chat.ts`
