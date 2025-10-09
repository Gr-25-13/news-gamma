"use server"

import { redirect } from "next/navigation"
import { ArticleSchema, ArticleValues } from "./schema"
import { prisma } from "@/lib/prisma"
//import { headers } from "next/headers"
//import { auth } from "@/lib/auth";

export async function editArticle(values: ArticleValues) {
    /*
    const session = await auth.api.getSession({ headers: await headers() });
     // Om session saknas eller användaren inte är admin då redirect till sign-in
     if (!session || session.user.role !== "admin") {
       redirect("/sign-in");
     }
   */
    const data = await ArticleSchema.parseAsync(values);
    const updatedArticle = await prisma.article.update({
        where: { id: data.id },
        data: {

            headline: data.headline,
            summary: data.summary,
            content: data.content,
            image_url: data.image_url,
            editorsChoice: data.editorsChoice,
            //category: data.category,
            //author: data.author,
        },
        select: { id: true }

    })
    redirect(`/article/${updatedArticle.id}`)


}