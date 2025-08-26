'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { MessagesBoard } from '../components/messagesBoard';
import { useScrollToBottom } from '../hooks/useScrollToBottom';
import { NewMessageForm } from '../components/newMessageForm';

export default function Page() {
  const [input, setInput] = useState('');
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const { messages, sendMessage } = useChat();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({ text: input });
    setInput('');
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-row justify-center pb-20 h-dvh bg-white dark:bg-zinc-900">
      <div className="flex flex-col justify-between items-center gap-4">
        <MessagesBoard
          messagesContainerRef={messagesContainerRef}
          messagesEndRef={messagesEndRef}
          messages={messages}
        />
        <NewMessageForm
          input={input}
          changeInput={changeInput}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
