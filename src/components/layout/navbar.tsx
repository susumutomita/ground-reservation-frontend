import Link from "next/link";
import UserDropdown from "@/components/layout/user-dropdown";

export default function Navbar() {
  return (
    <nav className="flex flex-wrap items-center justify-between bg-teal-500 p-6">
      <div className="mr-6 flex flex-shrink-0 items-center text-white">
        <Link href="/">
          <span className="text-xl font-semibold tracking-tight">
            野球場空き状況チェッカー
          </span>
        </Link>
      </div>
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="text-sm lg:flex-grow">
          <Link
            href="/dashboard"
            className="mr-4 mt-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block"
          >
            ダッシュボード
          </Link>
        </div>
        <div>
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
}
