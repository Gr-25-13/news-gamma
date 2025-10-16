import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"
import ArticleEditForm from "./form";
import { Params } from "../page"

export default async function ArticleEditPage(props: { params: Params }) {
    const params = await props.params;
    const articleId = params.articleId;
    {/*
    const session = await auth.api.getSession({ headers: await headers() });
 
    if (!session || session.user.role !== "admin") {
        redirect("/sign-in");
    }
  */}


    const article = await prisma.article.findUnique({
        where: { id: articleId }
    })
    if (!article) {
        return notFound();
    }
    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Edit article</h1>
            <ArticleEditForm article={article} />
        </>
    )
}