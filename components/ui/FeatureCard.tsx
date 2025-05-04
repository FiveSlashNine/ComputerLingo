import { LucideIcon } from "lucide-react";

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 space-y-4 rounded-lg border bg-gradient-to-b from-white to-slate-100 shadow-sm">
      <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
        <Icon className="h-6 w-6 text-green-500" />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default FeatureCard;
