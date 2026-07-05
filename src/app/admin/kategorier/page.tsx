import { prisma } from "@/lib/prisma";
import { requireAdminOrEditor } from "@/lib/server-auth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import LinkButton from "@/components/Buttons/LinkButton";
import SearchForm from "@/components/Forms/SearchForm";
import CreateCategoryForm from "./skapa/form";
import type { Category } from "@/generated/prisma";
import DeleteButton from "./ta-bort/delete-button";
import AdminNav from "@/components/Admin/AdminNav";

export default async function AdminKategorierPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  await requireAdminOrEditor();

  const params = await searchParams;
  const q = params?.q ?? "";
  const where = q
    ? {
        name: { contains: q },
      }
    : undefined;

  const categories: Category[] = await prisma.category.findMany({ where });

  return (
    <>
      <Navbar />
      <AdminNav />
      <main className="flex grow pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold mb-6">Admin: Kategorier</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-start">
            <SearchForm
              defaultValue={q}
              placeholder="Sök kategorier..."
              className="flex gap-2"
            />
            <div>
              {/* Inline create form */}
              <CreateCategoryForm />
            </div>
          </div>

          <ul className="space-y-4">
            {categories.map((c) => (
              <li key={c.id} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{c.name}</div>
                </div>
                <div className="flex gap-2 items-center">
                  <LinkButton
                    href={`/admin/kategorier/redigera/${c.id}`}
                    variant="primary"
                  >
                    Redigera
                  </LinkButton>
                  {/* Inline client delete button that calls the admin delete API */}
                  <DeleteButton id={c.id} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
