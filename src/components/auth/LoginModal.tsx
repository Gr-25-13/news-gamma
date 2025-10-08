"use client";

import * as React from "react";
import LoginForm from "../Forms/LoginForm";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

export default function LoginModal({ open, onClose, onLogin }: LoginModalProps) {
  if (!open) return null;

  function handleSubmit(data: { email: string; password: string }) {
    onLogin(data.email || "user@example.com");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md mx-4">
        <div className="bg-card text-card-foreground rounded-lg p-6 shadow-lg border border-border">
          <h2 className="text-xl font-semibold mb-4">Logga in</h2>
          <LoginForm onSubmit={handleSubmit} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
}

