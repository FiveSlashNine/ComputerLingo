"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TrueFalseExerciseProps {
  correctAnswer: boolean;
  isSubmitted: boolean;
  onAnswerChange: (answer: boolean) => void;
}

export function TrueFalseExercise({
  correctAnswer,
  isSubmitted,
  onAnswerChange,
}: TrueFalseExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const handleSelect = (value: boolean) => {
    if (!isSubmitted) {
      setSelectedAnswer(value);
      onAnswerChange(value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        <Button
          variant={selectedAnswer === true ? "default" : "outline"}
          className={cn(
            "w-32",
            isSubmitted &&
              correctAnswer === true &&
              "bg-green-500 hover:bg-green-600",
            isSubmitted &&
              selectedAnswer === true &&
              !correctAnswer &&
              "bg-red-500 hover:bg-red-600",
            (!isSubmitted &&
              selectedAnswer === true &&
              "bg-blue-50 border-blue-200") ||
              "hover:bg-gray-100 hover:border-gray-300"
          )}
          onClick={() => handleSelect(true)}
          disabled={isSubmitted}
        >
          True
        </Button>
        <Button
          variant={selectedAnswer === false ? "default" : "outline"}
          className={cn(
            "w-32",
            isSubmitted &&
              correctAnswer === false &&
              "bg-green-500 hover:bg-green-600",
            isSubmitted &&
              selectedAnswer === false &&
              correctAnswer &&
              "bg-red-500 hover:bg-red-600",
            (!isSubmitted &&
              selectedAnswer === false &&
              "bg-blue-50 border-blue-200") ||
              "hover:bg-gray-100 hover:border-gray-300"
          )}
          onClick={() => handleSelect(false)}
          disabled={isSubmitted}
        >
          False
        </Button>
      </div>
    </div>
  );
}
