import { DEFAULT_REQUIRED } from "./config";
import { QuestionEmpty } from "./types";

export const getEmptyQuestion: () => QuestionEmpty = () => {
  return {
    question: "Write you question.",
    required: DEFAULT_REQUIRED,
    type: "empty",
    questionId: Math.random(),
  };
};
