"use server";

import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export async function generateNews(topic: string) {
  const { object } = await generateObject({
    model: google("gemini-2.5-flash"),
    prompt: `Generate a news article by the following topic: ${topic}. Make sure you format the article in MD.`,
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      content: z.string(),
    }),
  });

  // Istället för att returnera så vill vi spara artikeln i databasen
  return object;
}
