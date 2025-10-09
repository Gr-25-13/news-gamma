"use client"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArticleSchema, ArticleValues } from "./schema";
import { createArticle } from "./actions";


export default function CreateArticleForm() {

    const form = useForm<ArticleValues>({
        resolver: zodResolver(ArticleSchema),
        defaultValues: {


            headline: "",
            summary: "",
            content: "",
            image_url: "",
            editorsChoice: true,
            category: "",
            //author: "",
        }
    })

    async function onSubmit(values: ArticleValues) {
        await createArticle(values)
        form.reset();
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit, (er) => console.error(er))}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="headline"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Headline</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Summary</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="editorsChoice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Editor&apos;s choice: DEFAULT TRUE</FormLabel>
                            <FormControl>
                                {/* TODO: boolean*/}


                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                {/* TODO: string array*/}
                                <Input {...field} />

                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/*<FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author: TODO</FormLabel>
                            <FormControl>
                                {/* TODO: string array 
                                <Input {...field} />
                                
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />*/}


                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Loading..." : "Save article"}
                </Button>

            </form>
        </Form>
    )



}