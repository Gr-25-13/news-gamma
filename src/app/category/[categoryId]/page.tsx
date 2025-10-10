import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import DeleteButton from "./delete-button";
import BackButton from "./back-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
//import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export type Params = Promise<{
    categoryId: string
}>

export default async function CategoryPage(props: { params: Params }) {
    /*
    const session = await auth.api.getSession({
        headers : await headers()
    })
    const isAdmin = !!session?.user && session.user.role ==="admin"
    */
    const params = await props.params;
    const catergoryId = params.categoryId;

    if (catergoryId == null) {
        return redirect("/category")
    }

    const category = await prisma.category.findUnique({
        where: { id: catergoryId }
    })
    if (!category) {
        return notFound();
    }
    return (
        <div>
            <BackButton />
            <h1>ID: {catergoryId} <br /> Name: {category.name}</h1>
            {/* {isAdmin &&(  */}
            <>
                <DeleteButton onDelete={async () => {
                    "use server"
                    const deletedCategory = await prisma.category.delete({
                        where: { id: catergoryId }

                    })
                    console.log("Deleted category with id: ", deletedCategory.id)
                    redirect("/category")
                }}
                />
                <Button asChild>
                    <Link href={`/category/${category.id}/edit`}> Edit category</Link>
                </Button>
            </>
            {/* )} */}
        </div>
    )



}