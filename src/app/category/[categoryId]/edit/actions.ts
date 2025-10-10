"use server";
import { redirect } from "next/navigation";
import { CategorySchema, CategoryValues } from "./schema";
import { prisma } from "@/lib/prisma"

export async function editCategory(values: CategoryValues) {
    const data = await CategorySchema.parseAsync(values);
    const updateCategory = await prisma.category.update({
        where: { id: data.id },
        data: {
            name: data.name,
        },
        select: { id: true }
    })
    redirect(`/category/${updateCategory.id}`)
}