export interface Question {
  question: string;
  required?: boolean;
}

export type QuestionRadio = Question & {
  answers: Answer[];
  type: "single";
};

export type QuestionCheckbox = Question & {
  answers: Answer[];
  type: "multi";
};

export type QuestionScale = Question & {
  length?: number;
  type: "scale";
  legend: string[];
};

export type QuestionOpen = Question & {
  limit?: number;
  type: "open";
};

export type QuestionImgs = Question & {
  type: "images";
  legend: string[];
};

export type AnyQuestion =
  | QuestionCheckbox
  | QuestionRadio
  | QuestionScale
  | QuestionOpen
  | QuestionImgs;

export type Answer =
  | string
  | number
  | { answer: string | number; options?: AnswerOptions };

export type AnswerOptions = {
  isOpen?: boolean;
  limit?: number;
  endsSurvey?: boolean;
};

export type ImgsConfig = string[];
