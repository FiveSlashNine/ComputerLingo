"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Code2,
  SlidersHorizontal,
  Terminal,
  ListChecks,
} from "lucide-react";

import { MultipleChoiceExercise } from "@/components/levels/MultipleChoiceExercise";
import { TrueFalseExercise } from "@/components/levels/TrueFalseExercise";
import { FillBlanksExercise } from "@/components/levels/FillBlanksExercise";
import { DragDropExercise } from "@/components/levels/DragDropExercise";
import { FeedbackMessage } from "@/components/levels/FeedbackMessage";

function getTypeIcon(type: string) {
  switch (type) {
    case "multiple-choice":
      return Code2;
    case "true-false":
      return SlidersHorizontal;
    case "fill-blanks":
      return Terminal;
    case "drag-drop":
      return ListChecks;
    default:
      return Code2;
  }
}

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = params?.id?.toString() ?? "1";
  const categoryId = params?.categoryId?.toString() ?? "1";

  const [questions, setQuestions] = useState<Level[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [level, setLevel] = useState<Level | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [booleanAnswer, setBooleanAnswer] = useState<boolean | null>(null);
  const [blanks, setBlanks] = useState<string[]>([]);
  const [dragItems, setDragItems] = useState<any[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lives, setLives] = useState(3);
  const [showRestartAlert, setShowRestartAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setLevel(null);
    setQuestions([]);
    setCurrentQuestionIdx(0);
    fetch(`/api/questions?categoryId=${categoryId}&levelId=${levelId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch level data");
        const data = await res.json();
        if (data.questions && data.questions.length > 0) {
          setQuestions(data.questions);
          setLevel({ ...data.questions[0] });
        } else {
          setError("Level not found");
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [categoryId, levelId]);

  useEffect(() => {
    if (!questions.length) return;
    setLevel({ ...questions[currentQuestionIdx] });
  }, [questions, currentQuestionIdx]);

  useEffect(() => {
    if (!level) return;
    if (level.type === "fill-blanks") {
      setBlanks(Array(level.blanks.length).fill(""));
    } else {
      setBlanks([]);
    }
    if (level.type === "drag-drop") {
      setDragItems([...level.items]);
    } else {
      setDragItems([]);
    }
    setSelectedAnswer("");
    setBooleanAnswer(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  }, [level]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">Loading...</div>
    );
  }
  if (error || !level) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        {error || "Level not found"}
      </div>
    );
  }

  const handleSubmit = () => {
    let correct = false;

    switch (level.type) {
      case "multiple-choice":
        correct = selectedAnswer === level.correctAnswer;
        setSelectedAnswer("");
        break;
      case "true-false":
        correct = booleanAnswer === level.correctAnswer;
        setBooleanAnswer(null);
        break;
      case "fill-blanks":
        correct = blanks.every(
          (answer, index) =>
            answer.toLowerCase().trim() ===
            level.blanks[index].toLowerCase().trim()
        );
        setBlanks(Array(level.blanks.length).fill(""));
        break;
      case "drag-drop":
        correct = dragItems.every(
          (item, index) => item.id === level.correctOrder[index]
        );
        break;
    }

    setIsCorrect(correct);
    setIsSubmitted(true);

    playSound("/sounds/submit.mp3");

    if (correct) {
      playSound("/sounds/correct.mp3");
    } else {
      playSound("/sounds/wrong.mp3");
      setLives((prev) => {
        if (prev <= 1) {
          setShowRestartAlert(true);
          return 0;
        }
        return prev - 1;
      });
    }
  };

  const playSound = (src: string) => {
    const audio = new Audio(src);
    audio.play().catch((e) => {
      console.error("Failed to play sound:", e);
    });
  };

  const handleRestartLevel = () => {
    playSound("/sounds/submit.mp3");
    setLives(3);
    setCurrentQuestionIdx(0);
    setLevel(questions[0] ? { ...questions[0] } : null);
    setSelectedAnswer("");
    setBooleanAnswer(null);
    setBlanks(
      questions[0]?.type === "fill-blanks"
        ? Array(questions[0].blanks.length).fill("")
        : []
    );
    setDragItems(
      questions[0]?.type === "drag-drop" ? [...questions[0].items] : []
    );
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowRestartAlert(false);
  };

  const handleNext = async () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((idx) => idx + 1);
    } else {
      setShowSuccessAlert(true);
    }
  };

  const increaseUserLevel = async () => {
    try {
      await fetch(`/api/levels?categoryId=${categoryId}&levelId=${levelId}`, {
        method: "POST",
      });
    } catch (e) {}
  };

  const goBackToLevels = async () => {
    playSound("/sounds/submit.mp3");
    await increaseUserLevel();
    router.push(`/levels/${categoryId}`);
  };

  const handlePrev = () => {
    playSound("/sounds/prev.mp3");
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((idx) => idx - 1);
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
      <div className="bg-background z-10 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={"/levels/" + categoryId}>
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
        {/* Show alert if user lost all lives */}
        {showRestartAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4 text-red-600">
                Out of Lives!
              </h2>
              <p className="mb-6">
                You lost all your lives. Press the button below to try the level
                again.
              </p>
              <Button
                onClick={handleRestartLevel}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Restart Level
              </Button>
            </div>
          </div>
        )}

        {showSuccessAlert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4 text-green-600">
                Congratulations!
              </h2>
              <p className="mb-6">You completed all questions in this level.</p>
              <Button
                onClick={goBackToLevels}
                className="w-full bg-gray-300 hover:bg-gray-400"
              >
                Back to Levels
              </Button>
            </div>
          </div>
        )}

        <header className="mb-6 text-center">
          <div className="flex items-center justify-center mb-2">
            <div className={`p-2 rounded-lg mr-3 ${getTypeColor(level.type)}`}>
              {(() => {
                const Icon = getTypeIcon(level.type);
                return <Icon className="h-5 w-5" />;
              })()}
            </div>
            <h1 className="text-2xl font-bold">{level.title}</h1>
          </div>

          <Progress value={33} className="h-1.5 mb-6" />
        </header>

        <Card className="bg-gray-50">
          <CardContent className="p-6">
            <h2 className="text-lg font-medium mb-6">{level.question}</h2>

            {renderExercise()}

            <div className="mt-8 flex gap-4">
              <Button
                onClick={handlePrev}
                disabled={currentQuestionIdx === 0}
                className="w-1/2"
                variant={currentQuestionIdx === 0 ? "outline" : "default"}
              >
                Previous
              </Button>

              <Button
                onClick={isSubmitted ? handleNext : handleSubmit}
                disabled={!isSubmitted && isSubmitDisabled()}
                className={`w-1/2 ${
                  isSubmitted
                    ? isCorrect
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                    : ""
                }`}
              >
                {isSubmitted
                  ? isCorrect
                    ? currentQuestionIdx < questions.length - 1
                      ? "Correct! Next Question"
                      : "Correct! Continue"
                    : currentQuestionIdx < questions.length - 1
                    ? "Next Question"
                    : "Continue"
                  : "Check Answer"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
