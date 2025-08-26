'use client';

import { useCompletion } from '@ai-sdk/react';
import { SendIcon } from '@/components/icons';

export default function Completion() {
  const { input, completion, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: '/api/completion',
    });

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Welcome to the AI SDK Completion
      </h1>
      <div className="flex flex-row w-full gap-4">
        <div className="text-zinc-300 w-full md:w-1/2">
          <p>
            <strong>Purpose:</strong> Completion is designed for single-turn,
            free-form text generation. You provide a prompt, and the model
            generates a single, coherent block of text that completes or follows
            that prompt.
          </p>
          <p>
            <strong>Context:</strong> The context is generally limited to the
            single prompt you provide. The model doesn't inherently remember the
            conversation history. It treats each request as a new, independent
            task.
          </p>
        </div>
        <p className="text-zinc-300 mb-4 w-full md:w-1/2">
          <p>
            <strong>Use Cases</strong>
          </p>
          <ul>
            <li>
              <strong>Summarization: </strong>"Summarize the following article:
              [text...]"
            </li>
            <li>
              <strong>Creative Writing:</strong> "Write a short story about a
              brave knight and a dragon."
            </li>
            <li>
              <strong>Code Generation:</strong> Write a Python function to sort
              a list of numbers.
            </li>
            <li>
              <strong>Single-shot Q&A:</strong> "What is the capital of France?"
            </li>
          </ul>
        </p>
      </div>

      <form
        className="flex flex-row gap-2 relative items-center w-full md:max-w-[500px] max-w-[calc(100dvw-32px) px-4 md:px-0"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-zinc-100 rounded-md px-2 py-1.5 flex-1 outline-none dark:bg-zinc-700 text-zinc-800 dark:text-zinc-300"
          placeholder="Start typing..."
          autoFocus
          value={input}
          onChange={handleInputChange}
        />
        <div className="relative text-sm bg-zinc-100 rounded-lg size-9 flex-shrink-0 flex flex-row items-center justify-center cursor-pointer hover:bg-zinc-200 dark:text-zinc-50 dark:bg-zinc-700 dark:hover:bg-zinc-800">
          <SendIcon />
        </div>
      </form>
      {isLoading && <p className="mt-4 text-zinc-300">Loading...</p>}
      {completion && (
        <div className="w-full md:w-1/2 mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Completion
          </h2>
          <p className="text-gray-800 whitespace-pre-wrap">{completion}</p>
        </div>
      )}
    </main>
  );
}
