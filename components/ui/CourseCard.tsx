import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";

function CourseCard({
  title,
  description,
  level,
  id,
  lessons,
  color,
}: {
  title: string;
  description: string;
  id: number;
  level: string;
  lessons: number;
  color: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const onClick = () => {
    if (session) {
      router.push("/levels/" + id);
    } else {
      router.push("/register");
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-gradient-to-b from-white to-slate-100 p-6 shadow-sm transition-all hover:shadow-lg">
      <div className={`absolute top-0 left-0 h-2 w-full ${color}`} />
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium uppercase text-muted-foreground">
            {level}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {lessons} lessons
          </span>
        </div>
      </div>
      <Button className="mt-4 w-full" onClick={onClick}>
        Start Learning
      </Button>
    </div>
  );
}

export default CourseCard;
