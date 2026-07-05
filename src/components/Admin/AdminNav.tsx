"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Newspaper, FolderOpen, Users, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "@/lib/client/auth-client";
import type { AdminUser } from "@/lib/schema/zod-schemas";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type AdminLink = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
};

const LINKS: AdminLink[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/artiklar", label: "Artiklar", icon: Newspaper },
  { href: "/admin/kategorier", label: "Kategorier", icon: FolderOpen },
  { href: "/admin/anvandare", label: "Användare", icon: Users, adminOnly: true },
];

function isLinkActive(pathname: string | null, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname?.startsWith(href) ?? false;
}

export default function AdminNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = (session?.user as unknown as AdminUser)?.role === "admin";
  const [open, setOpen] = useState(false);

  const links = LINKS.filter((link) => !link.adminOnly || isAdmin);

  return (
    <div className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-2">
          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted",
                  isLinkActive(pathname, href) &&
                    "bg-muted text-primary font-semibold",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobil: Sheet-meny */}
          <div className="md:hidden w-full">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-muted"
                >
                  <Menu className="h-4 w-4" />
                  Adminmeny
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Adminmeny</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-4 pb-4">
                  {links.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2.5 rounded-md text-base font-medium transition-colors hover:bg-muted",
                        isLinkActive(pathname, href) &&
                          "bg-muted text-primary font-semibold",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
