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
  Server,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import FeatureCard from "@/components/ui/FeatureCard";
import CourseCard from "@/components/ui/CourseCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="ComputerLingo Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-xl font-bold">Computer Lingo</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#courses"
              className="text-sm font-medium hover:text-primary"
            >
              Courses
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/protected"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl underline p-2 rounded-md w-full border hover:text-stone-200 transition-all"
            >
              SignIn/SignUp
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50 dark:bg-green-950/10">
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
                <Button
                  size="lg"
                  className="bg-green-500 p-2 hover:bg-green-600 text-white"
                >
                  Sign Up
                </Button>
                <Button size="lg" variant="outline">
                  View Courses
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
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
