import CreateArticle from "./createArticle";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/server-auth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import AdminNav from "@/components/Admin/AdminNav";

export default async function ArticleAIPage() {
  await requireAdmin();
  const categories = await prisma.category.findMany();
  const simplified = categories.map((c) => ({ id: c.id, name: c.name }));
  return (
    <>
      <Navbar />
      <AdminNav />
      <main className="flex grow pt-8 pb-16">
        <div className="container mx-auto max-w-5xl">
          {/* pass categories to client */}
          <CreateArticle categories={simplified} />
        </div>
      </main>
      <Footer />
    </>
  );
}
