"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DragItem {
  id: string;
  text: string;
}

interface DragDropExerciseProps {
  items: DragItem[];
  correctOrder: string[];
  isSubmitted: boolean;
  isCorrect: boolean;
  onAnswerChange: (items: DragItem[]) => void;
}

export function DragDropExercise({
  items,
  correctOrder,
  isSubmitted,
  isCorrect,
  onAnswerChange,
}: DragDropExerciseProps) {
  const [dragItems, setDragItems] = useState<DragItem[]>([...items]);

  useEffect(() => {
    setDragItems([...items]);
  }, [items]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("index", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = Number.parseInt(e.dataTransfer.getData("index"));
    const newItems = [...dragItems];
    const temp = newItems[dragIndex];
    newItems[dragIndex] = newItems[dropIndex];
    newItems[dropIndex] = temp;
    setDragItems(newItems);
    onAnswerChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {dragItems.map((item, index) => (
          <div
            key={item.id}
            draggable={!isSubmitted}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className={cn(
              "p-3 bg-muted rounded-lg cursor-move border-2 border-transparent",
              isSubmitted &&
                correctOrder[index] === item.id &&
                "border-green-500 bg-green-50",
              isSubmitted &&
                correctOrder[index] !== item.id &&
                "border-red-500 bg-red-50",
              !isSubmitted &&
                dragItems[index].id === item.id &&
                "hover:bg-gray-100 hover:border-gray-300"
            )}
          >
            <div className="flex items-center">
              <span className="mr-2 bg-background rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              {item.text}
            </div>
          </div>
        ))}
      </div>
      {isSubmitted && !isCorrect && (
        <div className="text-sm text-muted-foreground mt-2">
          <p>Correct order:</p>
          <ol className="list-decimal list-inside">
            {correctOrder.map((id) => (
              <li key={id}>{items.find((item) => item.id === id)?.text}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
