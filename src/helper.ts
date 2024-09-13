import { QuestionEmpty } from "./types";

export const generateEmptyQuestion = (questionIndex: number) => {
  return { type: "empty", required: false, questionIndex, question: "" } as QuestionEmpty;
};
