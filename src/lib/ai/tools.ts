import { tool as createTool } from 'ai';
import { z } from 'zod';

export const weatherTool = createTool({
  description: 'Display the weather for a location',
  inputSchema: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async function ({ location }: { location: string }) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { weather: 'Sunny', temperature: 75, location };
  },
  outputSchema: z.object({
    weather: z.string(),
    temperature: z.number(),
    location: z.string(),
  }),
});

export const stockTool = createTool({
  description: 'Get price for a given stock',
  inputSchema: z.object({
    symbol: z.string().describe('The symbol of the stock to get the price for'),
  }),
  execute: async function ({ symbol }: { symbol: string }) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { price: 100, symbol };
  },
  outputSchema: z.object({
    price: z.number(),
    symbol: z.string(),
  }),
});

export const tools = {
  displayWeather: weatherTool,
  getStockPrice: stockTool,
};
