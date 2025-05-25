"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  id: string;
  text: string;
}

interface MultipleChoiceExerciseProps {
  options: Option[];
  correctAnswer: string;
  isSubmitted: boolean;
  onAnswerChange: (answer: string) => void;
}

export function MultipleChoiceExercise({
  options,
  correctAnswer,
  isSubmitted,
  onAnswerChange,
}: MultipleChoiceExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedAnswer(value);
    onAnswerChange(value);
  };

  return (
    <RadioGroup
      value={selectedAnswer}
      onValueChange={handleChange}
      className="space-y-3"
      disabled={isSubmitted}
    >
      {options.map((option) => (
        <div
          key={option.id}
          className={cn(
            "flex items-center space-x-2 rounded-lg border cursor-pointer transition-colors",
            !isSubmitted &&
              selectedAnswer === option.id &&
              "bg-blue-50 border-blue-200",
            isSubmitted &&
              option.id === correctAnswer &&
              "bg-green-50 border-green-200",
            isSubmitted &&
              selectedAnswer === option.id &&
              option.id !== correctAnswer &&
              "bg-red-50 border-red-200",
            !isSubmitted &&
              selectedAnswer !== option.id &&
              "hover:bg-gray-100 hover:border-gray-300"
          )}
        >
          <RadioGroupItem
            value={option.id}
            id={option.id}
            className="sr-only"
          />
          <Label
            htmlFor={option.id}
            className="flex-1 cursor-pointer p-4 font-medium"
          >
            {option.text}
          </Label>
          {isSubmitted && option.id === correctAnswer && (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          )}
          {isSubmitted &&
            selectedAnswer === option.id &&
            option.id !== correctAnswer && (
              <X className="h-5 w-5 text-red-500" />
            )}
        </div>
      ))}
    </RadioGroup>
  );
}
