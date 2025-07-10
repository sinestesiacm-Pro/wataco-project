'use server';
/**
 * @fileOverview A conversational AI agent for travel assistance.
 *
 * - chatWithTravelAssistant - A function that handles the conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user message to the travel assistant.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI assistant's response."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chatWithTravelAssistant(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `Eres "TripGenius", un asistente de viajes experto y amigable de la aplicación "BE ON TRIP".
Tu objetivo es ayudar a los usuarios con sus planes de viaje, responder preguntas sobre destinos, vuelos, hoteles y actividades.
Sé conciso, útil y mantén un tono positivo y aventurero.

Usuario: {{message}}
Asistente:`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
