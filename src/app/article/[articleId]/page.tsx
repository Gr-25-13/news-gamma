import { notFound, redirect } from "next/navigation"
import DeleteButton from "./delete-button"
import { prisma } from "@/lib/prisma"
import BackButton from "./back-button";
import { Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
//import { auth } from "@/lib/auth"
//import { headers } from "next/headers"

export type Params = Promise<{ articleId: string }>;

export default async function ArticleDetailsPage(props: { params: Params }) {

    /*
    const session = await auth.api.getSession({
        headers: await headers()
    })
        const isAdmin = !!session?.user&& session.user.role == "admin";

    */
    const params = await props.params;
    const articleId = params.articleId;

    const article = await prisma.article.findUnique({
        where: { id: articleId },
    })
    if (!article) {
        return notFound();
    }
    return (
        <div>
            <BackButton />
            <h1> ID: {articleId} <br /> Headline: {article.headline} </h1>
            <p>
                Content: <br />
                {article.content}
            </p>

            {/* 
           {isAdmin && ( 
           */}
            <>
                <DeleteButton onDelete={async () => {
                    "use server"
                    const deletedArticle = await prisma.article.delete({
                        where: { id: articleId }
                    })
                    console.log("Deleted article with id: ", deletedArticle.id)
                    redirect("")
                }} />
                < Button asChild>
                    <Link href={`/article/${article.id}/edit`}>Edit article</Link>
                </Button>
            </>
            {/* 
                )}
           */}
        </div>
    )
}