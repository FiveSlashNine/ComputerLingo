"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BookOpen, Globe, Trophy, Menu } from "lucide-react";

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

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
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
        <div className="px-2 py-4">
          <nav className="flex flex-col gap-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                onClick={() => setOpen(false)}
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
        </div>
        <div className="border-t p-4 mt-auto">
          <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="User avatar"
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">User Name</span>
              <span className="text-xs text-muted-foreground">Level 5</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
