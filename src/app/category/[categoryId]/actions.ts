"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"


export async function deleteCategory(id: string) {
    const deletedCategory = await prisma.category.delete({
        where: { id },
    })
    console.log("Deleted category with id:", deletedCategory.id)
    redirect("/category")
}