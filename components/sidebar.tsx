"use client";

import type React from "react";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, Trophy, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

export function Sidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="hidden md:flex h-screen flex-col border-r bg-gradient-to-b from-white via-emerald-50/30 to-emerald-100/20 shadow-lg">
      {/* Logo Header */}
      <div className="flex h-16 items-center border-b border-emerald-100 px-6">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-400 p-2 shadow-md">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
            LearnQuest
          </span>
        </Link>
      </div>

      {/* Categories Section */}
      <div className="flex flex-col px-4 py-6">
        <div className="flex items-center gap-2 px-2 mb-4">
          <BookOpen className="h-4 w-4 text-emerald-700" />
          <h3 className="text-sm font-semibold text-emerald-700">Categories</h3>
        </div>

        {loading ? (
          <div className="flex flex-col gap-2 px-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 rounded-lg bg-emerald-100/50 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-4">
            <nav className="flex flex-col gap-2">
              {categories.map((category) => (
                <CategoryLink
                  key={category.id}
                  category={category}
                  isActive={category.id === currentCategory}
                />
              ))}
            </nav>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}

interface CategoryLinkProps {
  category: Category;
  isActive: boolean;
}

function CategoryLink({ category, isActive }: CategoryLinkProps) {
  return (
    <Link
      href={`/levels/${category.id}`}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-md shadow-emerald-200"
          : "hover:bg-white hover:shadow-md text-emerald-700"
      )}
    >
      <div
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-lg transition-colors",
          isActive ? "bg-white/20" : "bg-emerald-100 group-hover:bg-emerald-200"
        )}
      >
        <BookOpen
          className={cn(
            "h-3.5 w-3.5",
            isActive ? "text-white" : "text-emerald-600"
          )}
        />
      </div>
      <span className="font-medium">{category.name}</span>
      {isActive && (
        <div className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
          <ChevronRight className="h-3 w-3 text-white" />
        </div>
      )}
    </Link>
  );
}
