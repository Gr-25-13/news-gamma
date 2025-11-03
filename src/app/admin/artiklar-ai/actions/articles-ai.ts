"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/server-auth";

export async function saveArticle(data: {
  headLine: string;
  summary: string;
  content: string;
  category: string; // category id
  image_url?: string;
  editorsChoice?: boolean;
}) {
  // require admin session and use that user as author
  const session = await requireAdmin();

  if (!data.headLine || !data.summary || !data.content || !data.category) {
    throw new Error("All fields are required");
  }

  const article = await prisma.article.create({
    data: {
      headline: data.headLine,
      summary: data.summary,
      content: data.content,
      image_url: data.image_url ?? "",
      editorsChoice: data.editorsChoice ?? false,
      categoryId: data.category,
      authorId: session.user.id,
    },
  });
  return { id: article.id, headline: article.headline };
}
