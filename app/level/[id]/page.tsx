"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Heart,
  ListChecks,
  SlidersHorizontal,
  Terminal,
} from "lucide-react";

import { MultipleChoiceExercise } from "@/components/levels/MultipleChoiceExercise";
import { TrueFalseExercise } from "@/components/levels/TrueFalseExercise";
import { FillBlanksExercise } from "@/components/levels/FillBlanksExercise";
import { DragDropExercise } from "@/components/levels/DragDropExercise";
import { FeedbackMessage } from "@/components/levels/FeedbackMessage";

// Mock data
const levelData: Record<string, Level> = {
  "1": {
    id: 1,
    title: "Introduction to Variables",
    type: "multiple-choice",
    question:
      "Which of the following correctly declares a variable in JavaScript?",
    options: [
      { id: "a", text: "variable x = 10;" },
      { id: "b", text: "var x = 10;" },
      { id: "c", text: "x := 10;" },
      { id: "d", text: "x == 10;" },
    ],
    correctAnswer: "b",
    icon: Code2,
  },
  "2": {
    id: 2,
    title: "Control Flow Basics",
    type: "true-false",
    question:
      "In JavaScript, the condition in an if statement must be enclosed in curly braces {}.",
    correctAnswer: false,
    icon: SlidersHorizontal,
  },
  "3": {
    id: 3,
    title: "Function Fundamentals",
    type: "fill-blanks",
    question: "Complete the function to calculate the area of a rectangle:",
    codeTemplate:
      "function calculateArea(length, width) {\n  return ____ * ____;\n}",
    blanks: ["length", "width"],
    icon: Terminal,
  },
  "4": {
    id: 4,
    title: "Array Operations",
    type: "drag-drop",
    question:
      "Arrange the following steps to sort an array in ascending order using bubble sort:",
    items: [
      { id: "1", text: "Compare adjacent elements" },
      {
        id: "2",
        text: "Swap if the element found is greater than the next element",
      },
      { id: "3", text: "Repeat until no more swaps are needed" },
      { id: "4", text: "Start from the first element" },
    ],
    correctOrder: ["4", "1", "2", "3"],
    icon: ListChecks,
  },
};

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = params?.id?.toString() ?? "1";
  const level = levelData[levelId as keyof typeof levelData];

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [booleanAnswer, setBooleanAnswer] = useState<boolean | null>(null);
  const [blanks, setBlanks] = useState<string[]>(
    Array(level?.type === "fill-blanks" ? level.blanks.length : 0).fill("")
  );
  const [dragItems, setDragItems] = useState(
    level?.type === "drag-drop" ? [...level.items] : []
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lives, setLives] = useState(3);

  if (!levelId || !level) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        Level not found
      </div>
    );
  }

  const handleSubmit = () => {
    let correct = false;

    switch (level.type) {
      case "multiple-choice":
        correct = selectedAnswer === level.correctAnswer;
        break;
      case "true-false":
        correct = booleanAnswer === level.correctAnswer;
        break;
      case "fill-blanks":
        correct = blanks.every(
          (answer, index) =>
            answer.toLowerCase().trim() ===
            level.blanks[index].toLowerCase().trim()
        );
        break;
      case "drag-drop":
        correct = dragItems.every(
          (item, index) => item.id === level.correctOrder[index]
        );
        break;
    }

    setIsCorrect(correct);
    setIsSubmitted(true);

    if (!correct) {
      setLives((prev) => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    const nextId = Number.parseInt(levelId) + 1;
    const nextLevel = levelData[String(nextId)];

    if (nextLevel) {
      router.push(`/level/${nextId}`);
      setIsSubmitted(false);
      setIsCorrect(false);
      setSelectedAnswer("");
      setBooleanAnswer(null);
      setBlanks(
        Array(
          nextLevel.type === "fill-blanks" ? nextLevel.blanks.length : 0
        ).fill("")
      );
      setDragItems(nextLevel.type === "drag-drop" ? [...nextLevel.items] : []);
    } else {
      router.push("/");
    }
  };

  const renderExercise = () => {
    switch (level.type) {
      case "multiple-choice":
        return (
          <MultipleChoiceExercise
            options={level.options}
            correctAnswer={level.correctAnswer}
            isSubmitted={isSubmitted}
            onAnswerChange={setSelectedAnswer}
          />
        );
      case "true-false":
        return (
          <TrueFalseExercise
            correctAnswer={level.correctAnswer}
            isSubmitted={isSubmitted}
            onAnswerChange={setBooleanAnswer}
          />
        );
      case "fill-blanks":
        return (
          <FillBlanksExercise
            codeTemplate={level.codeTemplate}
            blanks={level.blanks}
            isSubmitted={isSubmitted}
            isCorrect={isCorrect}
            onAnswerChange={setBlanks}
          />
        );
      case "drag-drop":
        return (
          <DragDropExercise
            items={level.items}
            correctOrder={level.correctOrder}
            isSubmitted={isSubmitted}
            isCorrect={isCorrect}
            onAnswerChange={setDragItems}
          />
        );
      default:
        return <div>Unknown exercise type</div>;
    }
  };

  const isSubmitDisabled = () => {
    switch (level.type) {
      case "multiple-choice":
        return !selectedAnswer;
      case "true-false":
        return booleanAnswer === null;
      case "fill-blanks":
        return blanks.some((b) => !b.trim());
      case "drag-drop":
        return false;
      default:
        return true;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Fixed navigation header */}
      <div className="fixed top-0 left-0 right-0 bg-background z-10 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Levels
            </Button>
          </Link>

          <div className="flex items-center">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`h-5 w-5 ${
                  i < lives
                    ? "text-red-500 fill-red-500"
                    : "text-muted-foreground"
                } mr-1`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main content with padding to account for fixed header */}
      <div className="max-w-3xl mx-auto pt-16">
        <header className="mb-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className={`p-2 rounded-lg mr-3 ${getTypeColor(level.type)}`}>
              <level.icon className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold">{level.title}</h1>
          </div>

          <Progress value={33} className="h-1.5 mb-6" />
        </header>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-6">{level.question}</h2>

            {renderExercise()}

            <div className="mt-8 flex justify-between">
              {!isSubmitted ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitDisabled()}
                  className="w-full"
                >
                  Check Answer
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className={`w-full ${
                    isCorrect
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                >
                  {isCorrect ? "Correct! Continue" : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>

            <FeedbackMessage isCorrect={isCorrect} isSubmitted={isSubmitted} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
function getTypeColor(type: string) {
  switch (type) {
    case "multiple-choice":
      return "bg-blue-100 text-blue-600";
    case "true-false":
      return "bg-green-100 text-green-600";
    case "fill-blanks":
      return "bg-purple-100 text-purple-600";
    case "drag-drop":
      return "bg-amber-100 text-amber-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}
