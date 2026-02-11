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
  tips: z.string().describe('A list of travel tips for the destination, formatted as a markdown list.'),
});
export type GenerateDestinationTravelTipsOutput = z.infer<typeof GenerateDestinationTravelTipsOutputSchema>;

export async function generateDestinationTravelTips(input: GenerateDestinationTravelTipsInput): Promise<GenerateDestinationTravelTipsOutput> {
  return generateDestinationTravelTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDestinationTravelTipsPrompt',
  input: {schema: GenerateDestinationTravelTipsInputSchema},
  output: {schema: GenerateDestinationTravelTipsOutputSchema},
  prompt: `Eres un experto en viajes y un historiador apasionado. Genera una lista de 5 consejos de viaje y datos curiosos para un turista que visita {{destination}}.
  
  Formatea tu respuesta en una lista de markdown. Incluye una mezcla de consejos prácticos (ej. transporte, comida) y datos históricos o culturales interesantes y poco conocidos.
  
  Ejemplo de formato:
  - **Mejor época para visitar:** Evita la temporada de lluvias de junio a agosto para disfrutar de cielos despejados.
  - **Joya oculta:** Visita el mercado de San Telmo un domingo por la mañana para encontrar antigüedades únicas.
  - **Dato curioso:** ¿Sabías que el Obelisco fue construido en solo 31 días?
  `,
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
