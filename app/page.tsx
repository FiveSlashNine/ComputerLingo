"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Award,
  BookOpen,
  Code,
  Globe,
  type LucideIcon,
  MessageSquare,
  Menu,
  X,
  Server,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";
import CourseCard from "@/components/ui/CourseCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // We're still tracking scroll but not using it to change styles
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
      {/* Extra space before header */}
      <div className="h-6 w-full" />

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
              href="#courses"
              className="text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-white hover:bg-blue-100/30"
            >
              Courses
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-white hover:bg-blue-100/30"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-white hover:bg-blue-100/30"
            >
              Reviews
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium px-3 py-1.5 rounded-full transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-white hover:bg-blue-100/30"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
            )}
          </button>

          <div className="hidden md:flex items-center gap-3">
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
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-900/95 py-4 px-4 border-t dark:border-gray-800 backdrop-blur-md rounded-b-xl">
            <nav className="flex flex-col gap-3">
              <Link
                href="#courses"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 py-2 px-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Courses
              </Link>
              <Link
                href="#features"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 py-2 px-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 py-2 px-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-500 py-2 px-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2 border-t dark:border-gray-800 mt-2">
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
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Learn Computer Science the Fun Way
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Master programming, algorithms, and computer science
                    concepts through bite-sized, gamified lessons.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Start Learning For Free
                  </Button>
                  <Button size="lg" variant="outline">
                    Explore Courses
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>1M+ Learners</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <span>190+ Countries</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>Top Rated</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <Image
                    src="/logo.svg"
                    alt="Computer Lingo App Preview"
                    width={500}
                    height={500}
                    className="rounded-xl shadow-2xl"
                  />
                  <div className="absolute -right-6 -top-6 bg-green-100 dark:bg-green-900/30 p-4 rounded-xl shadow-lg">
                    <Trophy className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="absolute -left-6 -bottom-6 bg-blue-100 dark:bg-blue-900/30 p-4 rounded-xl shadow-lg">
                    <Code className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Temp Courses Section */}
        <section id="courses" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Our Computer Science Paths
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose your learning path and master computer science concepts
                  at your own pace.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <CourseCard
                title="Python Fundamentals"
                description="Learn Python from scratch with interactive lessons and challenges."
                level="Beginner"
                lessons={45}
                color="bg-green-500"
              />
              <CourseCard
                title="Web Development"
                description="Master HTML, CSS, and JavaScript to build modern websites."
                level="Intermediate"
                lessons={60}
                color="bg-blue-500"
              />
              <CourseCard
                title="Data Structures"
                description="Understand arrays, linked lists, trees, and algorithms."
                level="Intermediate"
                lessons={38}
                color="bg-purple-500"
              />
              <CourseCard
                title="Machine Learning"
                description="Build AI models and understand the math behind them."
                level="Advanced"
                lessons={52}
                color="bg-yellow-500"
              />
              <CourseCard
                title="Mobile Development"
                description="Create apps for iOS and Android using React Native."
                level="Intermediate"
                lessons={48}
                color="bg-red-500"
              />
              <CourseCard
                title="Database Design"
                description="Learn SQL, NoSQL, and database architecture principles."
                level="Intermediate"
                lessons={32}
                color="bg-teal-500"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Why Learn with Computer Lingo?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes learning computer science fun, effective,
                  and accessible to everyone.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <FeatureCard
                icon={Trophy}
                title="Gamified Learning"
                description="Earn XP, unlock achievements, and compete with friends to stay motivated."
              />
              <FeatureCard
                icon={BookOpen}
                title="Bite-sized Lessons"
                description="Learn in just 5 minutes a day with our short, focused lessons."
              />
              <FeatureCard
                icon={Users}
                title="Community Support"
                description="Join a global community of learners and mentors."
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-[96%] py-12 md:py-24 lg:py-32 m-10 border rounded-md bg-green-50 dark:bg-green-950/10 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.1),0_2px_8px_-2px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.2),0_2px_8px_-2px_rgba(0,0,0,0.06)] transition-transform duration-300">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Start Your ComputerLingo Journey Today
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our community of learners who are mastering computer
                  science the fun way.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-green-500 p-2 hover:bg-green-600 text-white"
                  >
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Computer Lingo Logo"
              width={30}
              height={30}
              className="rounded-full"
            />
            <span className="font-semibold">Computer Lingo</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Computer Lingo. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
