"use server";

import { prisma } from "@/lib/prisma";

export async function saveArticle(data:{
    headLine: string;       
    summary: string;
    content: string;
    category: string;
    author: string;
}){
    if (!data.headLine || !data.summary || !data.content || !data.category || !data.author){
        throw new Error("All fields are required");
    }   

    const article = await prisma.article.create({
        data: {
            headline: data.headLine,    
            summary: data.summary,
            content: data.content,
            image_url: "",
            category: {
                connect: { id: data.category }
            },
            author: {
                connect: { id: data.author }
            },
        },
    });
    return article;
}