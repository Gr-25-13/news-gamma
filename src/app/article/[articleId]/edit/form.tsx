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
import { Article } from "@/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArticleSchema, ArticleValues } from "./schema";
import { editArticle } from "./actions";


export default function ArticleEditForm({ article }: { article: Article }) {

    const form = useForm<ArticleValues>({
        resolver: zodResolver(ArticleSchema),
        defaultValues: {

            //id: article.id,
            headline: article.headline,
            summary: article.summary,
            content: article.content,
            image_url: article.image_url,
            // views: article.views,
            editorsChoice: article.editorsChoice,
            category: [],
            author: [],
        }
    })

    async function onSubmit(values: ArticleValues) {
        await editArticle(values)
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
                            <FormLabel>Editor&aposs choice</FormLabel>
                            <FormControl>
                                {/* TODO: boolean
                                <Input {...field} />
                                */}
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
                                {/* TODO: string array
                                <Input {...field} />
                                */}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Author</FormLabel>
                            <FormControl>
                                {/* TODO: string array
                                <Input {...field} />
                                */}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Loading..." : "Save article"}
                </Button>

            </form>
        </Form>
    )



}