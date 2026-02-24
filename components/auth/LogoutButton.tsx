"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { useRouter } from "next/navigation";

export function LogoutButton({ className }: { className?: string }) {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className={
        className ||
        "w-full text-left px-4 py-2 text-sm text-darkBrown hover:bg-cream transition-colors"
      }
    >
      Logout
    </button>
  );
}
