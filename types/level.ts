type BaseLevel = {
  id: number;
  title: string;
  type: string;
  question: string;
  icon: React.ElementType;
};

type MultipleChoiceLevel = BaseLevel & {
  type: "multiple-choice";
  options: { id: string; text: string }[];
  correctAnswer: string;
};

type TrueFalseLevel = BaseLevel & {
  type: "true-false";
  correctAnswer: boolean;
};

type FillBlanksLevel = BaseLevel & {
  type: "fill-blanks";
  codeTemplate: string;
  blanks: string[];
};

type DragDropLevel = BaseLevel & {
  type: "drag-drop";
  items: { id: string; text: string }[];
  correctOrder: string[];
};

type Level =
  | MultipleChoiceLevel
  | TrueFalseLevel
  | FillBlanksLevel
  | DragDropLevel;
