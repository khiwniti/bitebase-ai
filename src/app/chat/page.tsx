import ChatInterface from '@/components/chat/ChatInterface';
import { SharedStateProvider } from '@/components/shared/SharedStateProvider';

export default function ChatPage() {
  return (
    <SharedStateProvider>
      <ChatInterface />
    </SharedStateProvider>
  );
}