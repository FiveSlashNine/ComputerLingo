import { CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackMessageProps {
  isCorrect: boolean;
  isSubmitted: boolean;
}

export function FeedbackMessage({
  isCorrect,
  isSubmitted,
}: FeedbackMessageProps) {
  if (!isSubmitted) return null;

  return (
    <div
      className={cn(
        "mt-4 p-4 rounded-lg",
        isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
      )}
    >
      {isCorrect ? (
        <p className="flex items-center">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          Great job! You got it right.
        </p>
      ) : (
        <p className="flex items-center">
          <X className="h-5 w-5 mr-2" />
          Not quite right. Try to understand why the correct answer is what it
          is.
        </p>
      )}
    </div>
  );
}
