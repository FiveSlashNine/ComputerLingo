"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface FillBlanksExerciseProps {
  codeTemplate: string;
  blanks: string[];
  isSubmitted: boolean;
  isCorrect: boolean;
  onAnswerChange: (answers: string[]) => void;
}

export function FillBlanksExercise({
  codeTemplate,
  blanks,
  isSubmitted,
  isCorrect,
  onAnswerChange,
}: FillBlanksExerciseProps) {
  const [answers, setAnswers] = useState<string[]>(
    Array(blanks.length).fill("")
  );

  useEffect(() => {
    setAnswers(Array(blanks.length).fill(""));
  }, [blanks.length]);

  const handleChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    onAnswerChange(newAnswers);
  };

  return (
    <div className="space-y-4">
      <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
        {codeTemplate.split("____").map((part, index, array) => (
          <span key={index}>
            {part}
            {index < array.length - 1 && (
              <Input
                className="inline-block w-24 mx-1 font-mono"
                value={answers[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                disabled={isSubmitted}
                style={{
                  backgroundColor: isSubmitted
                    ? answers[index].toLowerCase().trim() ===
                      blanks[index].toLowerCase().trim()
                      ? "rgba(0, 255, 0, 0.1)"
                      : "rgba(255, 0, 0, 0.1)"
                    : undefined,
                }}
              />
            )}
          </span>
        ))}
      </div>
      {isSubmitted && !isCorrect && (
        <div className="text-sm text-muted-foreground mt-2">
          <p>Correct answers: {blanks.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
