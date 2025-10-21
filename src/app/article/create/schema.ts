import { z } from "zod";

export const ArticleSchema = z.object({
  headline: z.string().min(1),
  summary: z.string().min(1),
  content: z.string().min(1),
  image_url: z.string().min(1),
  editorsChoice: z.boolean(),
  category: z.string().min(1),
  author: z.string().min(1),
});

export type ArticleValues = z.infer<typeof ArticleSchema>;
