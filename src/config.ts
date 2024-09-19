import {
  Answer,
  QuestionCheckbox,
  QuestionDate,
  QuestionEmpty,
  QuestionImgs,
  QuestionOpen,
  QuestionRadio,
  QuestionScale,
} from "./types";

export const DEFAULT_CHARS_LIMIT = 20;
export const DEFAULT_SCALE_LENGTH = 5;
export const DEFAULT_MIN_SCALE = "Worst";
export const DEFAULT_MAX_SCALE = "Best";
export const DEFAULT_REQUIRED = true;
export const DEFAULT_MAX_DATE = "";
export const DEFAULT_MIN_DATE = "";
export const DEFAULT_ENDS_SURVEY = false;
export const DEFAULT_SHUFFLE_ANSWERS = false;

export const EMPTY_ANSWER: Answer = {
  answer: "",
  options: { isOpen: false, limit: DEFAULT_CHARS_LIMIT, endsSurvey: DEFAULT_ENDS_SURVEY },
};

export const EMPTY_QUESTION: QuestionEmpty = {
  question: "",
  required: DEFAULT_REQUIRED,
  type: "empty",
};

export const DEFAULT_DATE: QuestionDate = {
  ...EMPTY_QUESTION,
  type: "date",
  maxDate: "",
  minDate: "",
};

export const DEFAULT_IMAGES: QuestionImgs = {
  ...EMPTY_QUESTION,
  type: "images",
  legend: [DEFAULT_MIN_SCALE, DEFAULT_MAX_SCALE],
};

export const DEFAULT_OPEN: QuestionOpen = {
  ...EMPTY_QUESTION,
  type: "open",
  limit: DEFAULT_CHARS_LIMIT,
};

export const DEFAULT_SCALE: QuestionScale = {
  ...EMPTY_QUESTION,
  type: "scale",
  legend: [DEFAULT_MIN_SCALE, DEFAULT_MAX_SCALE],
  length: DEFAULT_SCALE_LENGTH,
};

export const DEFAULT_MULTI: QuestionCheckbox = {
  ...EMPTY_QUESTION,
  type: "multi",
  answers: [EMPTY_ANSWER, EMPTY_ANSWER],
  shuffleAnswers: DEFAULT_SHUFFLE_ANSWERS,
};

export const DEFAULT_SINGLE: QuestionRadio = {
  ...EMPTY_QUESTION,
  type: "single",
  answers: [EMPTY_ANSWER, EMPTY_ANSWER],
  shuffleAnswers: DEFAULT_SHUFFLE_ANSWERS,
};
