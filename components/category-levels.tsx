"use client";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Lock, Play, Star } from "lucide-react";
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
  userId: string; // pass userId as prop or get from auth context
  categoryId: number; // pass categoryId as prop
}

export function CategoryLevels({
  categoryName,
  userId,
  categoryId,
}: CategoryLevelsProps) {
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // You can customize descriptions for levels however you want:
  const levelDescriptions = [
    "Introduction",
    "Basic Vocabulary",
    "Simple Sentences",
    "Questions & Answers",
    "Conversation Practice",
    "Advanced Topics",
  ];

  useEffect(() => {
    async function fetchUserLevels() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `/api/levels?userId=${localStorage.getItem(
            "userId"
          )}&categoryId=${categoryId}`,
          {
            next: { revalidate: 60 },
          }
        );
        console.log(
          "Fetching levels for user:",
          userId,
          "category:",
          categoryId
        );

        if (!res.ok) throw new Error("Failed to fetch levels");
        const data = await res.json();

        // data.levelIndex = current completed level index for user (0-based or 1-based, adjust accordingly)
        // data.numLevels = total number of levels in this category

        const levelIndex = data.levelIndex; // current user level index (e.g. 3 means user completed level 3)
        const numLevels = data.numLevels;
        console.log("User level index:", levelIndex);
        console.log("env url:", process.env.BETTER_AUTH_URL);

        // Build levels dynamically
        const newLevels: Level[] = [];

        for (let i = 1; i <= numLevels; i++) {
          newLevels.push({
            id: i,
            name: `Level ${i}`,
            description: levelDescriptions[i - 1] || "Description coming soon",
            completed: levelIndex > 0 ? i < levelIndex : false,
            current: levelIndex === 0 ? i === 1 : i === levelIndex,
            locked: levelIndex === 0 ? i > 1 : i > levelIndex,
            stars: i < levelIndex ? 3 : 0, // example: completed levels have 3 stars
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
    console.log("Levels fetched:", levels);
  }, [userId, categoryId]);

  if (loading) return <div>Loading levels...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{categoryName}</h1>
        <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
          <div className="h-4 w-4 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-900">
            {levels.filter((l) => l.completed).length}/{levels.length} Completed
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levels.map((level) => (
          <LevelCard
            key={level.id}
            level={{ ...level, categoryName }} // pass categoryName for routing if needed
          />
        ))}
      </div>
    </div>
  );
}

interface LevelCardProps {
  level: Level & { categoryName?: string };
}

const LevelCard = ({ level }: LevelCardProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md",
        level.locked ? "opacity-70" : "",
        level.current ? "border-yellow-500 border-2" : "",
        level.completed ? "border-green-500 border" : ""
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span className="flex items-center gap-2">
            {level.name}
            {level.completed && (
              <CheckCircle className="h-5 w-5 text-green-500" />
            )}
          </span>
          <div className="flex">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-5 w-5 -mr-1",
                  i < level.stars
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300"
                )}
              />
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "h-24 rounded-lg flex items-center justify-center p-4",
            level.completed
              ? "bg-green-50"
              : level.current
              ? "bg-yellow-50"
              : "bg-gray-50"
          )}
        >
          {level.locked ? (
            <div className="text-center">
              <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            </div>
          ) : (
            <div className="text-center">
              <div className="mt-2 flex justify-center">
                {level.completed ? (
                  <div className="text-sm text-green-600 font-medium">
                    Completed
                  </div>
                ) : level.current ? (
                  <div className="text-sm text-yellow-600 font-medium">
                    In Progress
                  </div>
                ) : (
                  <div className="text-sm text-blue-600 font-medium">
                    Ready to start
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            router.push(`${pathname}/${level.id}`);
          }}
          className={cn(
            "w-full",
            level.completed
              ? "bg-green-500 hover:bg-green-600"
              : level.current
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-500 hover:bg-blue-600"
          )}
          disabled={level.locked}
        >
          {level.completed
            ? "Practice Again"
            : level.current
            ? "Continue"
            : "Start"}
          <Play className="h-4 w-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};
