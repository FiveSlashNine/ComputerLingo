"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Lock,
  Play,
  Star,
  Trophy,
  Target,
  Zap,
  BookOpen,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Level {
  id: number;
  name: string;
  description: string;
  completed?: boolean;
  current?: boolean;
  locked?: boolean;
  stars: number;
}

interface CategoryLevelsProps {
  categoryName: string;
  userId: string;
  categoryId: number;
}

export function CategoryLevels({
  categoryName,
  userId,
  categoryId,
}: CategoryLevelsProps) {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const levelDescriptions = [
      "Introduction",
      "Basic Vocabulary",
      "Simple Sentences",
      "Questions & Answers",
      "Conversation Practice",
      "Advanced Topics",
    ];

    async function fetchUserLevels() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `/api/levels?userId=${localStorage.getItem("userId")}&categoryId=${categoryId}`,
          {
            next: { revalidate: 60 },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch levels");
        const data = await res.json();

        const levelIndex = data.levelIndex;
        const numLevels = data.numLevels;

        const newLevels: Level[] = [];

        for (let i = 1; i <= numLevels; i++) {
          newLevels.push({
            id: i,
            name: `Level ${i}`,
            description: levelDescriptions[i - 1] || "Description coming soon",
            completed: i <= levelIndex,
            current: i === levelIndex + 1,
            locked: i > levelIndex + 1,
            stars: i <= levelIndex ? 3 : 0,
          });
        }

        setLevels(newLevels);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchUserLevels();
  }, [userId, categoryId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <BookOpen className="absolute inset-0 m-auto w-5 h-5 text-purple-600" />
          </div>
          <p className="text-slate-600 font-medium">Loading levels...</p>
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

  const completedCount = levels.filter((l) => l.completed).length;
  const progressPercentage = Math.round((completedCount / levels.length) * 100);

  return (
    <div className="space-y-8">
      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level, index) => (
          <LevelCard
            key={level.id}
            level={{ ...level, categoryName }}
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  );
}

interface LevelCardProps {
  level: Level & { categoryName?: string };
  delay?: number;
}

const LevelCard = ({ level, delay = 0 }: LevelCardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const getCardStyle = () => {
    if (level.completed) {
      return "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-emerald-100/50";
    }
    if (level.current) {
      return "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-amber-100/50";
    }
    if (level.locked) {
      return "bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200 opacity-60";
    }
    return "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-blue-100/50";
  };

  const getButtonStyle = () => {
    if (level.completed) {
      return "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-200";
    }
    if (level.current) {
      return "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-200";
    }
    return "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg shadow-blue-200";
  };

  const getIconColor = () => {
    if (level.completed) return "text-emerald-600";
    if (level.current) return "text-amber-600";
    if (level.locked) return "text-slate-400";
    return "text-blue-600";
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:scale-102 cursor-pointer backdrop-blur-sm",
        getCardStyle(),
        "animate-in fade-in-0 slide-in-from-bottom-4"
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => !level.locked && router.push(`${pathname}/${level.id}`)}
    >
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                level.completed
                  ? "bg-emerald-100"
                  : level.current
                    ? "bg-amber-100"
                    : level.locked
                      ? "bg-slate-100"
                      : "bg-blue-100"
              )}
            >
              {level.locked ? (
                <Lock className={cn("h-5 w-5", getIconColor())} />
              ) : level.completed ? (
                <CheckCircle className={cn("h-5 w-5", getIconColor())} />
              ) : (
                <Play className={cn("h-5 w-5", getIconColor())} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
                {level.name}
              </h3>
              <p className="text-sm text-slate-600">{level.description}</p>
            </div>
          </div>

          {/* Stars */}
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4 transition-all duration-200",
                  i < level.stars
                    ? "text-amber-400 fill-amber-400"
                    : "text-slate-300"
                )}
              />
            ))}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-center">
          <div
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium",
              level.completed
                ? "bg-emerald-100 text-emerald-700"
                : level.current
                  ? "bg-amber-100 text-amber-700"
                  : level.locked
                    ? "bg-slate-100 text-slate-500"
                    : "bg-blue-100 text-blue-700"
            )}
          >
            {level.completed
              ? "✨ Completed"
              : level.current
                ? "🎯 In Progress"
                : level.locked
                  ? "🔒 Locked"
                  : "🚀 Ready to Start"}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 pt-4">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            if (!level.locked) {
              router.push(`${pathname}/${level.id}`);
            }
          }}
          className={cn(
            "w-full font-semibold transition-all duration-200 transform hover:scale-105",
            getButtonStyle()
          )}
          disabled={level.locked}
        >
          {level.completed
            ? "Practice Again"
            : level.current
              ? "Continue"
              : level.locked
                ? "Locked"
                : "Start Level"}
          {!level.locked && <Play className="h-4 w-4 ml-2" />}
        </Button>
      </div>

      {/* Decorative Elements */}
      {!level.locked && (
        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
          {level.completed ? (
            <Trophy className="h-8 w-8 text-emerald-600" />
          ) : level.current ? (
            <Target className="h-8 w-8 text-amber-600" />
          ) : (
            <Zap className="h-8 w-8 text-blue-600" />
          )}
        </div>
      )}
    </div>
  );
};
