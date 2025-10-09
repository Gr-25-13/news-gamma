"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function deleteGenre(id: string) {
    const deleteArticle = await prisma.article.delete({
        where: { id },
    });

    console.log("Deleted article with id: ", deleteArticle.id);
    redirect("/article");
}
