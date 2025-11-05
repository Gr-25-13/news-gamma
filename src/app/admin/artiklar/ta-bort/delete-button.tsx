"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteArticle } from "@/lib/adminActions";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  return (
    <Button
      className="bg-red-600 p-2 rounded-lg text-white"
      disabled={isDeleting}
      onClick={async () => {
        if (!confirm("Är du säker på att du vill ta bort artikeln?")) return;
        setIsDeleting(true);
        try {
          const result = await deleteArticle(id);

          if (result?.ok) {
            toast.success("Artikeln togs bort");
            router.refresh();
            router.push("/admin/artiklar");
          } else {
            toast.error(
              "Kunde inte ta bort: " + (result?.error ?? "okänt fel")
            );
            setIsDeleting(false);
          }
        } catch (err) {
          console.error(err);
          toast.error("Något gick fel");
          setIsDeleting(false);
        }
      }}
    >
      {isDeleting ? "Tar bort..." : "Ta bort"}
    </Button>
  );
}
