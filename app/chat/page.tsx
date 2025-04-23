import { ChatInterface } from '@/components/chat-interface';

export default function ChatPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Chat with Our Assistant</h1>
      <ChatInterface />
    </div>
  );
} 