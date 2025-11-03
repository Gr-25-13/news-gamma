"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ArticleEditSchema, ArticleEditValues } from "./schema";
import { requireAdmin } from "@/lib/server-auth";

export async function editArticle(values: ArticleEditValues) {
  await requireAdmin();
  const data = await ArticleEditSchema.parseAsync(values);

  // For Article -> Category relation we store a single categoryId.
  // Pick the first provided category id (if any) and connect that.
  const categoryId = data.categoryIds?.[0];

  const updated = await prisma.article.update({
    where: { id: data.id },
    data: {
      headline: data.headline,
      summary: data.summary,
      content: data.content,
      image_url: data.image_url,
      editorsChoice: data.editorsChoice,
      // Only connect a single category (schema defines Article.category as a singular relation)
      ...(categoryId ? { category: { connect: { id: categoryId } } } : {}),
    },
  });
  // After editing an article, return the admin to the articles list
  redirect(`/admin/artiklar`);
}
