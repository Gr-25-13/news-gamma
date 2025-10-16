"use client"

import { useForm } from "react-hook-form"
import { CategorySchema, CategoryValues } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategory } from "./actions";

export default function CreateCategoryForm() {
    const form = useForm<CategoryValues>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: ""
        }
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(createCategory)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name: </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button disabled={form.formState.isSubmitting || !form.formState.isValid}>
                    {form.formState.isSubmitting ? "Loading..." : "Create category"}
                </Button>
            </form>
        </Form>
    )
}