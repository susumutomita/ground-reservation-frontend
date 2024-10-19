import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">野球場空き状況チェッカー</h1>
        <p className="mt-3 text-2xl">簡単に野球場の空き状況を確認できます</p>
        <div className="mt-6">
          <Link href="/dashboard">
            <Button>ダッシュボードへ</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
