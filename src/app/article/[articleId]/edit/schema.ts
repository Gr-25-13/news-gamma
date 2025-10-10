import { z } from "zod"

export const ArticleSchema = z.object({
    id: z.string().min(1),
    headline: z.string().min(1),
    summary: z.string().min(1),
    content: z.string().min(1),
    image_url: z.string().min(1),
    editorsChoice: z.boolean(),
    category: z.array(z.string()).max(50),
    author: z.array(z.string()).max(50),
})

export type ArticleValues = z.infer<typeof ArticleSchema>;