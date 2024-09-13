import { createSlice } from "@reduxjs/toolkit";
import {
  AnyQuestion,
  QuestionCheckbox,
  QuestionDate,
  QuestionEmpty,
  QuestionImgs,
  QuestionOpen,
  QuestionRadio,
  QuestionScale,
} from "../types";
import { generateEmptyQuestion } from "../helper";
import { DEFAULT_SCALE_LENGTH, DEFAULT_CHARS_LIMIT, DEFAULT_MIN_SCALE, DEFAULT_MAX_SCALE } from "../config";

const initialState: {
  questions: AnyQuestion[];
} = {
  questions: [generateEmptyQuestion(0)],
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    removeQuestion(state, action) {
      state.questions = state.questions
        .filter((el) => el.questionIndex !== action.payload)
        .map((el, questionIndex) => {
          return { ...el, questionIndex };
        });
    },
    addQuestion(state, action) {
      state.questions.push(action.payload);
    },
    // each modification of a question is always handled in a a way that keeps the proper structure of an object
    setQuestionData(
      state,
      action: { type: string; payload: { questionIndex: number; questionData: Partial<AnyQuestion> } }
    ) {
      const { questionIndex, questionData } = action.payload;
      const qState = state.questions[questionIndex];
      const qAction = action.payload.questionData as AnyQuestion;
      const type = questionData.type ?? qState.type;

      // 3 params are common for all, if not specified in action - keep them as they are in state
      const newQuestionBaseParams = {
        question: questionData.question ?? qState.question ?? "",
        required: questionData.required ?? qState.required ?? false,
        questionIndex: questionData.questionIndex ?? qState.questionIndex,
      };

      if (type === "date") {
        (state.questions[questionIndex] as QuestionDate) = {
          ...newQuestionBaseParams,
          maxDate: (qAction as QuestionDate).maxDate ?? (qState as QuestionDate).maxDate ?? "",
          minDate: (qAction as QuestionDate).minDate ?? (qState as QuestionDate).minDate ?? "",
          type: "date",
        };
      }

      if (type === "images") {
        (state.questions[questionIndex] as QuestionImgs) = {
          ...newQuestionBaseParams,
          legend: (qAction as QuestionImgs).legend ?? (qState as QuestionImgs).legend ?? ["", ""],
          type: "images",
        };
      }

      if (type === "multi") {
        (state.questions[questionIndex] as QuestionCheckbox) = {
          ...newQuestionBaseParams,
          answers: (qAction as QuestionCheckbox).answers ?? (qState as QuestionCheckbox).answers ?? [],
          type: "multi",
        };
      }

      if (type === "open") {
        (state.questions[questionIndex] as QuestionOpen) = {
          ...newQuestionBaseParams,
          type: "open",
          limit: (qAction as QuestionOpen).limit ?? (qState as QuestionOpen).limit ?? DEFAULT_CHARS_LIMIT,
        };
      }

      if (type === "scale") {
        (state.questions[questionIndex] as QuestionScale) = {
          ...newQuestionBaseParams,
          type: "scale",
          legend: (qAction as QuestionScale).legend ??
            (qState as QuestionScale).legend ?? [DEFAULT_MIN_SCALE, DEFAULT_MAX_SCALE],
          length: (qAction as QuestionScale).length ?? (qState as QuestionScale).length ?? DEFAULT_SCALE_LENGTH,
        };
      }

      if (type === "single") {
        (state.questions[questionIndex] as QuestionRadio) = {
          ...newQuestionBaseParams,
          type: "single",
          answers: (qAction as QuestionRadio).answers ?? (qState as QuestionRadio).answers ?? ["", ""],
        };
      }

      if (type === "empty") {
        (state.questions[questionIndex] as QuestionEmpty) = {
          ...newQuestionBaseParams,
          type: "empty",
        };
      }
    },
  },
});

export const surveyActions = surveySlice.actions;

export default surveySlice.reducer;
