import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Zap } from "lucide-react";

export function CategoryProgress() {
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
          <div className="flex items-center gap-2">
            <div className="bg-green-100 p-2 rounded-full">
              <Trophy className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Level 5</p>
              <p className="text-xs text-muted-foreground">Intermediate</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Star className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium">250 XP</p>
              <p className="text-xs text-muted-foreground">This week</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-red-100 p-2 rounded-full">
              <Zap className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium">7 Day Streak</p>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">Course Progress</span>
            <span className="text-sm font-medium">25%</span>
          </div>
          <Progress value={25} className="h-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <ProgressCard title="Basics 1" progress={100} />
          <ProgressCard title="Basics 2" progress={100} />
          <ProgressCard title="Phrases" progress={75} />
          <ProgressCard title="Travel" progress={25} />
        </div>
      </div>
    </div>
  );
}

interface ProgressCardProps {
  title: string;
  progress: number;
}

function ProgressCard({ title, progress }: ProgressCardProps) {
  return (
    <div
      className={cn(
        "p-3 rounded-lg border",
        progress === 100 ? "bg-green-50 border-green-200" : "bg-white"
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
