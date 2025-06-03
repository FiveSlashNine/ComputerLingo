"use client";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Zap } from "lucide-react";
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
  console.log("Current category ID:", currentCategory);

  useEffect(() => {
    const fetchAllCategoryProgress = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found in localStorage");

        // Step 1: Fetch all categories
        const catRes = await fetch("/api/categories");
        if (!catRes.ok) throw new Error("Failed to fetch categories");
        const categories: Category[] = await catRes.json();

        // Step 2: Fetch progress for each category
        const progressData: CategoryProgressData[] = await Promise.all(
          categories.map(async (category) => {
            try {
              const levelRes = await fetch(
                `/api/levels?userId=${userId}&categoryId=${category.id}`
              );
              if (!levelRes.ok) throw new Error("Level fetch failed");
              const levelData = await levelRes.json();

              const levelIndex = levelData.levelIndex || 1;
              const numLevels = levelData.numLevels || 1;
              const progressPercent = Math.round(
                ((levelIndex - 1) / numLevels) * 100
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
      <div className="flex items-center justify-center h-screen">
        <span>Loading category progress...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Your Progress</h2>
          <p className="text-sm text-muted-foreground">
            Keep learning to maintain your streak!
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ProgressStat
            icon={<Trophy className="h-5 w-5 text-green-600" />}
            title="Level 5"
            subtitle="Intermediate"
          />
          <ProgressStat
            icon={<Star className="h-5 w-5 text-yellow-600" />}
            title="250 XP"
            subtitle="This week"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          {categoriesProgress.map((category) => (
            <ProgressCard
              key={category.id}
              title={category.name}
              progress={category.progress}
              highlight={category.id === currentCategory}
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
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-gray-100 p-2 rounded-full">{icon}</div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

interface ProgressCardProps {
  title: string;
  progress: number;
  highlight?: boolean;
}

function ProgressCard({ title, progress, highlight }: ProgressCardProps) {
  return (
    <div
      className={cn(
        "p-3 rounded-lg border",
        progress === 100
          ? "bg-green-50 border-green-200"
          : highlight
          ? "bg-yellow-50 border-yellow-200"
          : "bg-white"
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium">{title}</h3>
        <span className="text-xs font-medium">{progress}%</span>
      </div>
      <Progress value={progress} className="h-1.5" />
    </div>
  );
}
