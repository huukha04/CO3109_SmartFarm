import { Message, MessageAvatar, MessageContent } from '@/components/ui/shadcn-io/ai/message';
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ui/shadcn-io/ai/reasoning';
import { Source, Sources, SourcesContent, SourcesTrigger } from '@/components/ui/shadcn-io/ai/source';
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ui/shadcn-io/ai/conversation';

export type ChatMessage = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  reasoning?: string;
  sources?: Array<{ title: string; url: string }>;
  isStreaming?: boolean;
};
import { useSession } from 'next-auth/react';

export const ChatMessageList = ({ messages }: { messages: ChatMessage[] }) => {
  const { data: session } = useSession();

  return (
    <Conversation className="flex-1">
      <ConversationContent className="space-y-4">
        {messages.map(message => (
          <div key={message.id} className="space-y-3">
            <Message from={message.role}>
              <MessageContent>
                {message.isStreaming && message.content === '' ? (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">Đang suy nghĩ...</span>
                  </div>
                ) : message.content}
              </MessageContent>
              <MessageAvatar 
                src={
                  message.role === 'user' 
                    ? session?.user?.image || 'https://github.com/identicons/default.png'
                    : 'https://github.com/vercel.png'
                }
                name={message.role === 'user' ? session?.user?.name || 'You' : 'AI'} 
              />
            </Message>

            {message.reasoning && (
              <div className="ml-10">
                <Reasoning isStreaming={message.isStreaming} defaultOpen={false}>
                  <ReasoningTrigger />
                  <ReasoningContent>{message.reasoning}</ReasoningContent>
                </Reasoning>
              </div>
            )}

            {message.sources && message.sources.length > 0 && (
              <div className="ml-10">
                <Sources>
                  <SourcesTrigger count={message.sources.length} />
                  <SourcesContent>
                    {message.sources.map((source, index) => (
                      <Source key={index} href={source.url} title={source.title} />
                    ))}
                  </SourcesContent>
                </Sources>
              </div>
            )}
          </div>
        ))}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  );
};