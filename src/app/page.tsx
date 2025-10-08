import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Aside } from '@/components/layout/aside';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { articles } from '@/lib/articles';

export default async function HomePage(): Promise<React.ReactElement> {
  const main = articles[0];
  const editors = articles.slice(1, 3);

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <section className="bg-card p-6 rounded-xl shadow-lg border">
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">Senaste</h2>
                <article className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2 relative h-64 md:h-auto">
                    <Image
                      src={main.image || ''}
                      alt={main.title}
                      fill
                      className="rounded-lg object-cover w-full h-auto md:h-64 shadow-md"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <p className="text-sm font-semibold text-primary uppercase">{main.category}</p>
                    <h3 className="mt-2 text-3xl font-extrabold leading-tight hover:text-primary cursor-pointer">
                      {main.title}
                    </h3>
                    <p className="mt-4 text-muted-foreground line-clamp-4">{main.excerpt}</p>
                    <Link href={`/articles/${main.slug}`} className="mt-4 inline-flex items-center text-primary hover:text-primary/80 font-medium">
                      Läs mer &rarr;
                    </Link>
                  </div>
                </article>
              </section>

              <section className="space-y-6">
                <h2 className="text-2xl font-bold border-b pb-2">Redaktörens Val</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {editors.map((a) => (
                    <article key={a.id} className="bg-card p-4 rounded-lg shadow hover:shadow-lg transition duration-200 border">
                      <span className="text-xs font-semibold text-muted-foreground uppercase">{a.category}</span>
                      <h4 className="mt-1 text-lg font-bold hover:text-primary cursor-pointer line-clamp-2">
                        <Link href={`/articles/${a.slug}`}>{a.title}</Link>
                      </h4>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{a.excerpt}</p>
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