import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-8 flex justify-center gap-8 shadow-md mb-8">
      <Link href="/" className="hover:text-blue-400 font-semibold">Home</Link>
      <Link href="/users" className="hover:text-blue-400 font-semibold">Users</Link>
      <Link href="/blog" className="hover:text-blue-400 font-semibold">Blog</Link>
    </nav>
  );
}
