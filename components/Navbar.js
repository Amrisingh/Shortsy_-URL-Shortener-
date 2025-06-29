import Link from "next/link";
import { Zap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-gray-900">Shortsy</span>
      </div>
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-gray-700 hover:text-sky-600 font-medium transition-colors">
          Home
        </Link>
        <Link href="/shorten" className="text-gray-700 hover:text-sky-600 font-medium transition-colors">
          Shorten
        </Link>
      </div>
    </nav>
  );
}