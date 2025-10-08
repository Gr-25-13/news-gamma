"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import NavLinks from "./navLinks";
import AuthButtons from "./authButtons";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-xl font-semibold text-gray-800">
              Dagens Dos
            </Link>
            <p className="text-xs italic text-gray-500 hidden sm:block">
              Svenskaste gör ont, här får du en bedövning
            </p>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <NavLinks onClick={undefined} />
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex">
            <AuthButtons onClick={undefined} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setOpen(!open)}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
          <div className="px-4 py-3 flex flex-col gap-2">
            <NavLinks onClick={() => setOpen(false)} />
            <hr className="my-2" />
            <AuthButtons onClick={() => setOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  );
}
