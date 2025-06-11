"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

export function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Get categoryId from dynamic route /levels/[categoryId]
  const params = useParams();
  const currentCategory = Number(params.categoryId);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <span>Loading categories...</span>
      </div>
    );
  }

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
              key={category.id}
              href={`/levels/${category.id}`}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                category.id === currentCategory
                  ? "bg-green-100 text-green-900"
                  : "hover:bg-muted"
              )}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">User Name</span>
            <span className="text-xs text-muted-foreground">Level 5</span>
          </div>
        </div>
      </div>
    </div>
  );
}
