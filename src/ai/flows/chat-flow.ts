
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

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('The conversation history.'),
  message: z.string().describe('The latest user message to the travel assistant.'),
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
  prompt: `Eres "TripGenius", un asistente de viajes experto y amigable de la aplicación "ORVIAN".
Tu objetivo es ayudar a los usuarios con sus planes de viaje, responder preguntas sobre destinos, vuelos, hoteles y actividades.
Sé conciso, útil y mantén un tono positivo y aventurero.

Historial de la conversación:
{{#each history}}
  {{#if (eq this.role 'user')}}
    Usuario: {{this.content}}
  {{else}}
    Asistente: {{this.content}}
  {{/if}}
{{/each}}

Nuevo mensaje:
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
    // Handlebars doesn't have a built-in 'eq' helper. We need to manually format the history.
    // However, a simpler prompt structure is often more effective.
    const historyText = input.history
      .map(msg => (msg.role === 'user' ? `Usuario: ${msg.content}` : `Asistente: ${msg.content}`))
      .join('\n');
      
    const effectivePrompt = `Eres "TripGenius", un asistente de viajes experto y amigable de la aplicación "ORVIAN".
Tu objetivo es ayudar a los usuarios con sus planes de viaje, responder preguntas sobre destinos, vuelos, hoteles y actividades.
Sé conciso, útil y mantén un tono positivo y aventurero.

${historyText}

Usuario: ${input.message}
Asistente:`;

    const { output } = await ai.generate({
        prompt: effectivePrompt,
        output: { schema: ChatOutputSchema }
    });
    
    return output!;
  }
);
