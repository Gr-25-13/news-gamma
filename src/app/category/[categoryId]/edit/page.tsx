import { notFound, redirect } from "next/navigation";
import { Params } from "../page"
import { prisma } from "@/lib/prisma"
import CategoryEditForm from "./form";
import { headers } from "next/headers"
//import { auth } from "@/lib/auth"
export default async function CategoryEditPage(props: { params: Params }) {
    /*
    const session= await auth.api.getSession({
        headers:await headers()
    })
    const isAdmin =!!session?.user && session.user.role === "admin";
    */
    const params = await props.params;
    const categoryId = params.categoryId;

    if (categoryId == null) {
        return redirect("/category")
    }

    const category = await prisma.category.findUnique({
        where: { id: categoryId },
    })

    if (!categoryId) {
        return notFound();
    }

    if (!category) {
        return notFound();
    }

    return (
        <>
            {/* isAdmin && ( */}
            <h1 className="text-3xl font bold mb4">Edit Category</h1>
            <CategoryEditForm category={category} />
            {/* )} */}
        </>
    )
}