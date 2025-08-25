import { memo, RefObject } from "react";
import { UIMessage } from "ai";
import { Message as PreviewMessage } from "./message";

interface IProps {
  messagesContainerRef: RefObject<HTMLDivElement | null>;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  messages: UIMessage[];
}

export const MessagesBoard = memo((props: IProps) => {
  const { messagesContainerRef, messagesEndRef, messages } = props;

  return (
    <div
      ref={messagesContainerRef}
      className="flex flex-col gap-4 h-full w-dvw items-center overflow-y-scroll"
    >
      {messages.map((message, index) => (
        <PreviewMessage
          key={`${"id"}-${index}`}
          role={message.role}
          parts={message.parts}
        />
      ))}
      <div
        ref={messagesEndRef}
        className="flex-shrink-0 min-w-[24px] min-h-[24px]"
      />
    </div>
  );
});
