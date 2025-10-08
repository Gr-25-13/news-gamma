import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Aside } from "@/components/layout/aside";
import type { Article } from "@/lib/articles";
import { articles } from "@/lib/articles";

export default function HomePage(): React.ReactElement {
  const main: Article = articles[0];
  const editors: Article[] = articles.slice(1, 3);

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <section className="bg-card p-6 rounded-xl shadow-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4 border-b border-border pb-2">
                  Senaste
                </h2>

                <article className="flex flex-col md:flex-row gap-6">
                  <Link
                    href={`/articles/${main.slug}`}
                    className="md:w-1/2 block rounded-lg overflow-hidden shadow-md"
                    aria-label={main.title}
                  >
                    <Image
                      src={main.image || "/placeholder.jpg"}
                      alt={main.title}
                      width={800}
                      height={500}
                      className="object-cover w-full h-full"
                    />
                  </Link>

                  <div className="md:w-1/2">
                    <p className="text-sm font-semibold text-primary uppercase">
                      {main.category}
                    </p>
                    <Link href={`/articles/${main.slug}`} className="mt-2 block">
                      <h3 className="text-3xl font-extrabold text-foreground leading-tight hover:text-primary cursor-pointer">
                        {main.title}
                      </h3>
                    </Link>
                    <p className="mt-4 text-muted-foreground line-clamp-4">{main.excerpt}</p>
                    <Link
                      href={`/articles/${main.slug}`}
                      className="mt-4 inline-flex items-center text-primary hover:text-primary/90 font-medium"
                    >
                      Läs mer &rarr;
                    </Link>
                  </div>
                </article>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground border-b border-border pb-2">
                  Redaktörens Val
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {editors.map((a) => (
                    <article
                      key={a.id}
                      className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition duration-200 border border-border"
                    >
                      <p className="text-xs font-semibold text-accent uppercase">
                        {a.category}
                      </p>
                      <Link href={`/articles/${a.slug}`} className="mt-1 block">
                        <h4 className="mt-1 text-lg font-bold text-foreground hover:text-accent cursor-pointer line-clamp-2">
                          {a.title}
                        </h4>
                      </Link>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{a.excerpt}</p>
                      <Link
                        href={`/articles/${a.slug}`}
                        className="mt-3 inline-block text-sm text-primary hover:underline"
                      >
                        Läs mer
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            <Aside />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}