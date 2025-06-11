"use client";

import type React from "react";

export const dynamic = "force-dynamic";

import { cn } from "@/lib/utils";
import { Trophy, Zap, BookOpen, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

interface CategoryProgressData {
  id: number;
  name: string;
  progress: number; // 0–100
}

export function CategoryProgress() {
  const [categoriesProgress, setCategoriesProgress] = useState<
    CategoryProgressData[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const currentCategory = Number(params.categoryId);

  useEffect(() => {
    const fetchAllCategoryProgress = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in localStorage");

        // Step 1: Fetch all categories
        const catRes = await fetch("/api/categories");
        if (!catRes.ok) throw new Error("Failed to fetch categories");
        const categories: Category[] = await catRes.json();

        console.log("Fetched categories:", categories);

        // Step 2: Fetch progress for each category
        const progressData: CategoryProgressData[] = await Promise.all(
          categories.map(async (category) => {
            try {
              const levelRes = await fetch(
                `/api/levels?userId=${userId}&categoryId=${category.id}`
              );

              const progRes = await fetch(
                `/api/levels?userId=${userId}&categoryId=${category.id}`
              );

              if (!levelRes.ok) throw new Error("Level fetch failed");
              const levelData = await levelRes.json();

              if (!progRes.ok) throw new Error("Progress fetch failed");
              const progData = await progRes.json();
              const levelIndex = progData.levelIndex; // 0-based index
              const numLevels = levelData.numLevels;
              const progressPercent = Math.round(
                (levelIndex / numLevels) * 100
              );
              console.log(
                `Progress for category ${category.id}: ${progressPercent}%
                levelIndex: ${levelIndex}, numLevels: ${numLevels}`
              );

              return {
                id: category.id,
                name: category.name,
                progress: progressPercent,
              };
            } catch (err) {
              console.warn(
                `Failed to fetch levels for category ${category.id}:`,
                err
              );
              return {
                id: category.id,
                name: category.name,
                progress: 0,
              };
            }
          })
        );

        setCategoriesProgress(progressData);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategoryProgress();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <BookOpen className="absolute inset-0 m-auto w-5 h-5 text-purple-600" />
          </div>
          <p className="text-slate-600 font-medium">Loading your progress...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const totalProgress =
    categoriesProgress.reduce((sum, cat) => sum + cat.progress, 0) /
      categoriesProgress.length || 0;

  return (
    <div className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl p-8 shadow-lg border border-purple-100/50 mb-8">
      {/* Progress Cards Grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-800">
            Category Progress
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categoriesProgress.map((category, index) => (
            <ProgressCard
              key={category.id}
              title={category.name}
              progress={category.progress}
              highlight={category.id === currentCategory}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProgressStat({
  icon,
  title,
  subtitle,
  bgColor,
  borderColor,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 hover:shadow-md hover:scale-102",
        bgColor,
        borderColor
      )}
    >
      <div className="bg-white/80 p-2 rounded-lg shadow-sm">{icon}</div>
      <div>
        <p className="text-sm font-bold text-slate-800">{title}</p>
        <p className="text-xs text-slate-600">{subtitle}</p>
      </div>
    </div>
  );
}

interface ProgressCardProps {
  title: string;
  progress: number;
  highlight?: boolean;
  delay?: number;
}

function ProgressCard({
  title,
  progress,
  highlight,
  delay = 0,
}: ProgressCardProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, delay);
    return () => clearTimeout(timer);
  }, [progress, delay]);

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "from-emerald-500 to-green-500";
    if (progress >= 75) return "from-blue-500 to-cyan-500";
    if (progress >= 50) return "from-purple-500 to-pink-500";
    if (progress >= 25) return "from-orange-500 to-amber-500";
    return "from-slate-400 to-slate-500";
  };

  const getBgColor = (progress: number, highlight: boolean) => {
    if (progress === 100)
      return "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200";
    if (highlight)
      return "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200";
    return "bg-white/80 border-slate-200";
  };

  return (
    <div
      className={cn(
        "group p-5 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-102 cursor-pointer backdrop-blur-sm",
        getBgColor(progress, highlight || false),
        "animate-in fade-in-0 slide-in-from-bottom-4"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-slate-700">{progress}%</span>
          {progress === 100 && <Trophy className="w-3 h-3 text-emerald-600" />}
        </div>
      </div>

      <div className="space-y-2">
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r",
              getProgressColor(progress)
            )}
            style={{ width: `${animatedProgress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">
            {progress === 100
              ? "Complete!"
              : progress === 0
                ? "Get started"
                : "In progress"}
          </span>
          {progress > 0 && progress < 100 && (
            <span className="text-slate-600 font-medium">
              {progress >= 75
                ? "Almost there!"
                : progress >= 50
                  ? "Halfway!"
                  : "Keep going!"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
