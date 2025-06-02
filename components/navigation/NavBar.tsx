"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          localStorage.removeItem("userId");
          router.push("/login");
        },
      },
    });
  };

  return (
    <header className="sticky top-6 z-50 w-[96%] mx-auto rounded-xl bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:border-gray-800 py-0 border shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),0_2px_8px_-2px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.2),0_2px_8px_-2px_rgba(0,0,0,0.06)] transition-transform duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-500 to-blue-500 opacity-70 blur-md transition-all duration-300 group-hover:opacity-100"></div>
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="ComputerLingo Logo"
                width={40}
                height={40}
                className="rounded-full border-2 border-white p-1 bg-white"
              />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            Computer Lingo
          </span>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/#courses"
            className="text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-white hover:bg-blue-100/30"
          >
            Courses
          </Link>
          <Link
            href="/#features"
            className="text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-white hover:bg-blue-100/30"
          >
            Features
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          )}
        </button>

        {/* Desktop Sign In / Sign Up or Logout */}
        <div className="hidden md:flex items-center gap-3">
          {!session && !isPending ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-white hover:bg-blue-100/30"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-white font-medium rounded-full py-2 px-4 shadow-md hover:shadow-lg transition-all duration-300 text-sm bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                Start Learning
              </Link>
            </>
          ) : (
            session && (
              <button
                onClick={handleLogout}
                className="text-white font-medium rounded-full py-2 px-4 shadow-md hover:shadow-lg transition-all duration-300 text-sm bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                Logout
              </button>
            )
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 py-4 px-4 border-t dark:border-gray-800 backdrop-blur-md rounded-b-xl">
          <nav className="flex flex-col gap-3">
            <Link
              href="/#courses"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500 py-2 px-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              href="/#features"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500 py-2 px-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>

            <div className="pt-2 border-t dark:border-gray-800 mt-2">
              {!session && !isPending ? (
                <>
                  <Link
                    href="/login"
                    className="block w-full text-center hover:text-blue-500 py-2 px-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="block w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full py-2 px-4 text-sm text-center mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Start Learning
                  </Link>
                </>
              ) : (
                session && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-full py-2 px-4 text-sm text-center mt-2"
                  >
                    Logout
                  </button>
                )
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
