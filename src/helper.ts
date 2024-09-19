import { DEFAULT_REQUIRED, EMPTY_ANSWER } from "./config";
import { QuestionCheckbox, QuestionEmpty } from "./types";

export const generateEmptyQuestion = (questionIndex: number) => {
  return { type: "empty", required: false, questionIndex, question: "" } as QuestionEmpty;
};

export const generateMultiQuestion: (i: number) => QuestionCheckbox = () => {
  const question: QuestionCheckbox = {
    type: "multi",
    answers: [EMPTY_ANSWER, EMPTY_ANSWER],
    question: "",
    required: DEFAULT_REQUIRED,
  };
  return question;
};
