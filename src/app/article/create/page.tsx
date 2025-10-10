import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"
import CreateArticleForm from "./form";



export default async function CreateArticlePage() {

    {/*
    const session = await auth.api.getSession({ headers: await headers() });
 
    const isAdmin = !!session?.user && session.user.role === "admin";
  */}

    return (
        <>
            {/*
         {isAdmin && (
           */}
            <div>

                <h1 className="text-3xl font-bold mb-4">Create article</h1>
                <CreateArticleForm />
            </div>
            {/*
         )}
         */}
        </>
    )
}