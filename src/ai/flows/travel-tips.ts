// src/ai/flows/travel-tips.ts
'use server';
/**
 * @fileOverview A travel tips AI agent.
 *
 * - generateDestinationTravelTips - A function that handles the travel tips generation process.
 * - GenerateDestinationTravelTipsInput - The input type for the generateDestinationTravelTips function.
 * - GenerateDestinationTravelTipsOutput - The return type for the generateDestinationTravelTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDestinationTravelTipsInputSchema = z.object({
  destination: z.string().describe('The destination city for which to generate travel tips.'),
});
export type GenerateDestinationTravelTipsInput = z.infer<typeof GenerateDestinationTravelTipsInputSchema>;

const GenerateDestinationTravelTipsOutputSchema = z.object({
  tips: z.string().describe('A list of travel tips for the destination.'),
});
export type GenerateDestinationTravelTipsOutput = z.infer<typeof GenerateDestinationTravelTipsOutputSchema>;

export async function generateDestinationTravelTips(input: GenerateDestinationTravelTipsInput): Promise<GenerateDestinationTravelTipsOutput> {
  return generateDestinationTravelTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDestinationTravelTipsPrompt',
  input: {schema: GenerateDestinationTravelTipsInputSchema},
  output: {schema: GenerateDestinationTravelTipsOutputSchema},
  prompt: `Eres un experto en viajes. Genera una lista de consejos de viaje para {{destination}}.\n`,
});

const generateDestinationTravelTipsFlow = ai.defineFlow(
  {
    name: 'generateDestinationTravelTipsFlow',
    inputSchema: GenerateDestinationTravelTipsInputSchema,
    outputSchema: GenerateDestinationTravelTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
