"use client";
import { useCallback, useState } from 'react';
import { nanoid } from 'nanoid';
import { ChatHeader } from './chatHeader';
import { ChatMessageList, ChatMessage } from './chatMessageList';
import { ChatInput } from './chatInput';

const models = [
  { id: 'x-ai/grok-4-fast:free', name: 'Grok 4 Fast (Free)' },
  { id: 'deepseek/deepseek-chat-v3.1:free', name: 'DeepSeek Chat V3.1 (Free)' },
];

export const ChatContainer = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nanoid(),
      content: "Xin chào! Tôi có thể giúp gì cho bạn?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [isTyping, setIsTyping] = useState(false);

  const simulateTyping = useCallback(
    (messageId: string, content: string) => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === messageId
              ? { ...msg, content: content.slice(0, currentIndex), isStreaming: currentIndex < content.length }
              : msg
          )
        );
        currentIndex++;
        if (currentIndex > content.length) clearInterval(interval);
      }, 20);
    },
    []
  );

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      if (!inputValue.trim() || isTyping) return;

      // Add user message
      const userMessage: ChatMessage = { id: nanoid(), content: inputValue.trim(), role: 'user', timestamp: new Date() };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      // Add placeholder assistant message
      const assistantMessageId = nanoid();
      setMessages(prev => [...prev, { id: assistantMessageId, content: '', role: 'assistant', timestamp: new Date(), isStreaming: true }]);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: selectedModel, message: userMessage.content }),
        });
        const data = await res.json();
        const content = data.reply || "No response from API";

        simulateTyping(assistantMessageId, content);
        setTimeout(() => setIsTyping(false), content.length * 20 + 50);

      } catch (err) {
        console.error(err);
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessageId
              ? { ...msg, content: 'Failed to get response from API', isStreaming: false }
              : msg
          )
        );
        setIsTyping(false);
      }
    },
    [inputValue, isTyping, selectedModel, simulateTyping]
  );

  const handleReset = useCallback(() => {
    setMessages([
      {
        id: nanoid(),
        content: "Xin chào! Tôi có thể giúp gì cho bạn?",
        role: 'assistant',
        timestamp: new Date(),
      },
    ]);
    setInputValue('');
    setIsTyping(false);
  }, []);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border bg-background shadow-sm">
      <ChatHeader onReset={handleReset} />
      <ChatMessageList messages={messages} />
      <ChatInput inputValue={inputValue} setInputValue={setInputValue} handleSubmit={handleSubmit} isTyping={isTyping} selectedModel={selectedModel} setSelectedModel={setSelectedModel} models={models} />
    </div>
  );
};
