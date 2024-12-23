export type QuestionType = "single" | "multi" | "scale" | "open" | "images" | "date";

export type Question = {
  question: string;
  required: boolean;
  questionId: number;
};

export type QuestionRadio = Question & {
  type: "single";
  answers: Answer[];
  shuffleAnswers: boolean;
};

export type QuestionCheckbox = Question & {
  type: "multi";
  answers: Answer[];
  shuffleAnswers: boolean;
};

export type QuestionScale = Question & {
  type: "scale";
  length: number;
  legend: string[];
};

export type QuestionOpen = Question & {
  type: "open";
  limit: number;
  uploadImg: boolean;
};

export type QuestionImgs = Question & {
  type: "images";
  legend: string[];
};

export type QuestionDate = Question & {
  type: "date";
  minDate: string;
  maxDate: string;
};

export type QuestionEmpty = Question & {
  type: "empty";
};

export type AnyQuestion =
  | QuestionCheckbox
  | QuestionRadio
  | QuestionScale
  | QuestionOpen
  | QuestionImgs
  | QuestionDate
  | QuestionEmpty;

export type Answer = { answer: string | number; options: AnswerOptions };

export type AnswerOptions = {
  isOpen: boolean;
  endsSurvey: boolean;
  limit: number;
};

export type ImgsConfig = string[];

export type AnswerIndex = {
  index: number;
  no: number;
};
