"use server";

import { redirect } from "next/navigation";
import { ArticleSchema, ArticleValues } from "./schema";
import { prisma } from "@/lib/prisma";
//import { headers } from "next/headers"
//import { auth } from "@/lib/auth";

export async function createArticle(
  values: ArticleValues & { authorId: string }
) {
  /*
    const session = await auth.api.getSession({ headers: await headers() });
    // Om session saknas eller användaren inte är admin då redirect till sign-in
    if (!session || session.user.role !== "admin") {
      redirect("/sign-in");
    }
    */
  const data = await ArticleSchema.parseAsync(values);

  const article = await prisma.article.create({
    data: {
      headline: data.headline,
      summary: data.summary,
      content: data.content,
      image_url: data.image_url,
      editorsChoice: data.editorsChoice,
      categories: {
        create: [{ name: data.category }],
      },
      author: {
        connect: {
          id: data.authorId,
        },
      },
    },
  });

  redirect(`/article/${article.id}`);
}
