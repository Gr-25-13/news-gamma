//import { auth } from "@/lib/auth"
import CreateCategoryForm from "./form"
import { headers } from "next/headers"

export default async function CreateCategoryPage() {
    /*
     const session = await auth.api.getSession({
         headers: await headers()
     })
     const isAdmin = !!session?.user && session.user.role == "admin";
     */
    return (
        <>
            {/*
    {isAdmin && ()}
    */}
            <div>
                <h1 className="text-3xl font-bold mb-6"> Create category</h1>
                <CreateCategoryForm />
            </div>

            {/* )}*/}
        </>
    )
}