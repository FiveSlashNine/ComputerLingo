import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Globe, Trophy } from "lucide-react";

const categories = [
  {
    name: "Basics 1",
    icon: BookOpen,
    href: "/basics-1",
    active: true,
  },
  {
    name: "Basics 2",
    icon: BookOpen,
    href: "/basics-2",
    active: false,
  },
  {
    name: "Phrases",
    icon: Globe,
    href: "/phrases",
    active: false,
  },
  {
    name: "Travel",
    icon: Globe,
    href: "/travel",
    active: false,
  },
  {
    name: "Family",
    icon: Globe,
    href: "/family",
    active: false,
  },
  {
    name: "Shopping",
    icon: Globe,
    href: "/shopping",
    active: false,
  },
  {
    name: "Food",
    icon: Globe,
    href: "/food",
    active: false,
  },
  {
    name: "Activities",
    icon: Globe,
    href: "/activities",
    active: false,
  },
  {
    name: "Weather",
    icon: Globe,
    href: "/weather",
    active: false,
  },
  {
    name: "Education",
    icon: BookOpen,
    href: "/education",
    active: false,
  },
  {
    name: "Work",
    icon: BookOpen,
    href: "/work",
    active: false,
  },
  {
    name: "Health",
    icon: BookOpen,
    href: "/health",
    active: false,
  },
];

export function Sidebar() {
  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="rounded-full bg-green-500 p-1">
            <div className="h-6 w-6 text-white">
              <Trophy className="h-6 w-6" />
            </div>
          </div>
          <span className="text-xl font-bold">LearnQuest</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2 py-4">
        <nav className="flex flex-col gap-1">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                category.active
                  ? "bg-green-100 text-green-900"
                  : "hover:bg-muted"
              )}
            >
              <category.icon className="h-5 w-5" />
              {category.name}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full"></div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">User Name</span>
            <span className="text-xs text-muted-foreground">Level 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
