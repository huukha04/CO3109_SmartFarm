import {
  PromptInput,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ui/shadcn-io/ai/prompt-input';

export const ChatInput = ({
  inputValue,
  setInputValue,
  handleSubmit,
  isTyping,
  selectedModel,
  setSelectedModel,
  models,
}: {
  inputValue: string;
  setInputValue: (val: string) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  isTyping: boolean;
  selectedModel: string;
  setSelectedModel: (val: string) => void;
  models: { id: string; name: string }[];
}) => (
  <div className="border-t p-4">
    <PromptInput onSubmit={handleSubmit}>
      <PromptInputTextarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Hãy hỏi tôi bất cứ điều gì về phát triển, lập trình hoặc công nghệ..."
        disabled={isTyping}
      />
      <PromptInputToolbar>
        <PromptInputTools>
          <PromptInputModelSelect 
            value={selectedModel} 
            onValueChange={setSelectedModel}
            disabled={isTyping}
          >
            <PromptInputModelSelectTrigger>
              <PromptInputModelSelectValue />
            </PromptInputModelSelectTrigger>
            <PromptInputModelSelectContent>
              {models.map(model => (
                <PromptInputModelSelectItem key={model.id} value={model.id}>
                  {model.name}
                </PromptInputModelSelectItem>
              ))}
            </PromptInputModelSelectContent>
          </PromptInputModelSelect>
        </PromptInputTools>
        <PromptInputSubmit 
          disabled={!inputValue.trim() || isTyping}
          status={isTyping ? 'streaming' : 'ready'}
        />
      </PromptInputToolbar>
    </PromptInput>
  </div>
);
