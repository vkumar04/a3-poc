"use client";

import { useChat } from "@ai-sdk/react";
import { ChatMessageList } from "./ui/chat-message-list";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "./ui/chat-bubble";
import { ChatInput } from "./ui/chat-input";
import { Button } from "./ui/button";
import { CornerDownLeft, Mic, Paperclip, SendIcon } from "lucide-react";

export default function ExcelChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] w-[500px] rounded-md border bg-background">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <h3 className="font-semibold">Audit Assistant</h3>
        <div className="text-sm text-muted-foreground">
          {messages.length > 0 ? `${messages.length} messages` : "Ask me about Historical RACM's"}
        </div>
      </div>
      
      <ChatMessageList>
        {(messages.map((msg, idx) => (
            <ChatBubble key={idx}>
                <ChatBubbleAvatar fallback={msg.role === "user"? "ME" : "AI"} />
              <ChatBubbleMessage 
                className="text-sm"
                variant={msg.role === "user" ? "sent" : "received"}
              >
                {msg.content}
              </ChatBubbleMessage>
            </ChatBubble>
          ))
        )}
      </ChatMessageList>
      
      <div className="border-t p-4 w-full">
      <form
    onSubmit={onSubmit}
    className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
  >
    <ChatInput
      placeholder="Type your message here..."
      className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
      value={input}
      onChange={handleInputChange}
    />
    <div className="flex items-center p-3 pt-0">
      <Button variant="ghost" size="icon">
        <Paperclip className="size-4" />
        <span className="sr-only">Attach file</span>
      </Button>

      <Button variant="ghost" size="icon">
        <Mic className="size-4" />
        <span className="sr-only">Use Microphone</span>
      </Button>

      <Button
        size="sm"
        className="ml-auto gap-1.5"
        type="submit"
        disabled={!input.trim()}
      >
        Send Message
        <CornerDownLeft className="size-3.5" />
      </Button>
    </div>
  </form>
      </div>
    </div>
  );
}