'use client';

import { UIMessagePart } from 'ai';
import { motion } from 'framer-motion';
import { BotIcon, UserIcon } from './icons';
import { memo, ReactNode } from 'react';
import { Markdown } from './markdown';
import { Weather } from './weather';
import { Stock } from './stock';

interface IProps {
  role: string;
  parts: UIMessagePart<any, any>[];
}

export const Message = memo(({ role, parts }: IProps) => {
  console.log(parts);

  return (
    <motion.div
      className={`flex flex-row gap-4 px-4 w-full md:w-[500px] md:px-0 first-of-type:pt-20`}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <div className="size-[24px] flex flex-col justify-center items-center flex-shrink-0 text-zinc-400">
        {role === 'assistant' ? <BotIcon /> : <UserIcon />}
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="text-zinc-800 dark:text-zinc-300 flex flex-col gap-4">
          {parts?.map((part, index) => {
            if (part.type === 'text') {
              return (
                <Markdown key={index}>
                  {(part as any).text ||
                    (part as any).result ||
                    'Processing...'}
                </Markdown>
              );
            }
            if (part.type === 'tool-displayWeather') {
              switch (part.state) {
                case 'input-available':
                  return <div key={index}>Loading weather...</div>;
                case 'output-available':
                  return (
                    <div key={index}>
                      <Weather {...part.output} />
                    </div>
                  );
                case 'output-error':
                  return <div key={index}>Error: {part.errorText}</div>;
                default:
                  return null;
              }
            }
            if (part.type === 'tool-getStockPrice') {
              switch (part.state) {
                case 'input-available':
                  return <div key={index}>Loading stock price...</div>;
                case 'output-available':
                  return (
                    <div key={index}>
                      <Stock {...part.output} />
                    </div>
                  );
              }
            }
            return null;
          })}
        </div>
      </div>
    </motion.div>
  );
});
