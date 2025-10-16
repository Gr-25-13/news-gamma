"use server"

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma"
import { CategorySchema, CategoryValues } from "./schema";
/* 
import {auth} from "@/lib/auth"
import {headers} from "next/headers"
*/
export async function createCategory(values: CategoryValues) {
    /* const session = await auth.api.getSession({
    headers : await headers(),
    }) 
    if (!session) {
    redirect("/sign-in")
    }
    */
    const data = await CategorySchema.parseAsync(values)
    const category = await prisma.category.create({
        data: {
            name: data.name
        }

    })
    redirect(`/category/${category.id}`)
}

