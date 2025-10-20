"use server";

import { z } from "zod";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";

export async function generateNewsObject(topic: string) {
  const { object } = await generateObject({
    model: google("gemini-2.5-flash"),
    prompt: `Generate a short, structured news article about: ${topic}. 
    Include a title, a brief summary, and the main content.`,
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      content: z.string(),
    }),
  });

  return object;
}
