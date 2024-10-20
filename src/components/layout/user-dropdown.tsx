"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserDropdown() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // session と session.user の存在を確認
  if (!session || !session.user) {
    return (
      <Link href="/api/auth/signin">
        <Button>サインイン</Button>
      </Link>
    );
  }

  return (
    <div className="relative">
      <Button onClick={() => setIsOpen(!isOpen)}>{session.user.name}</Button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-md bg-white shadow-xl">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            プロフィール
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            設定
          </Link>
          <button
            onClick={() => signOut()}
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            サインアウト
          </button>
        </div>
      )}
    </div>
  );
}
