import { createSlice } from "@reduxjs/toolkit";
import {
  Answer,
  AnswerOptions,
  AnyQuestion,
  QuestionCheckbox,
  QuestionDate,
  QuestionEmpty,
  QuestionImgs,
  QuestionOpen,
  QuestionRadio,
  QuestionScale,
} from "../types";
import {
  DEFAULT_SCALE_LENGTH,
  DEFAULT_CHARS_LIMIT,
  DEFAULT_MIN_SCALE,
  DEFAULT_MAX_SCALE,
  EMPTY_ANSWER,
  DEFAULT_MAX_DATE,
  DEFAULT_MIN_DATE,
  DEFAULT_IMAGES,
  DEFAULT_MULTI,
  DEFAULT_SINGLE,
  EMPTY_QUESTION,
} from "../config";

const initialState: {
  questions: AnyQuestion[];
} = {
  questions: [EMPTY_QUESTION],
};

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    removeQuestion(state, action) {
      state.questions = state.questions
        .filter((_, i) => i !== action.payload)
        .map((el, questionIndex) => {
          return { ...el, questionIndex };
        });
    },

    addQuestion(state) {
      state.questions.push(EMPTY_QUESTION);
    },

    removeAnswer(
      state,
      action: { type: string; payload: { questionIndex: number; answerIndex: number } }
    ) {
      const { questionIndex, answerIndex } = action.payload;
      (state.questions[questionIndex] as QuestionRadio | QuestionCheckbox).answers.filter(
        (_, i) => i !== answerIndex
      );
    },

    addAnswer(state, action: { type: string; payload: { questionIndex: number } }) {
      const { questionIndex } = action.payload;
      (state.questions[questionIndex] as QuestionRadio | QuestionCheckbox).answers.push(
        EMPTY_ANSWER
      );
    },

    setAnswerData(
      state,
      action: {
        type: string;
        payload: { questionIndex: number; answerIndex: number; answerData: Partial<Answer> };
      }
    ) {
      const { questionIndex, answerIndex, answerData } = action.payload;
      const newAnswer = {
        ...(state.questions[questionIndex] as QuestionRadio | QuestionCheckbox).answers[
          answerIndex
        ],
        answerData,
      };

      (state.questions[questionIndex] as QuestionRadio | QuestionCheckbox).answers[answerIndex] =
        newAnswer;
    },

    setAnswerOptions(
      state,
      action: {
        type: string;
        payload: { questionIndex: number; answerIndex: number; options: Partial<AnswerOptions> };
      }
    ) {
      const { questionIndex, answerIndex, options } = action.payload;
      const newOptions = {
        ...(state.questions[questionIndex] as QuestionRadio | QuestionCheckbox).answers[answerIndex]
          .options,
        options,
      };

      (state.questions[questionIndex] as QuestionRadio | QuestionCheckbox).answers[
        answerIndex
      ].options = newOptions;
    },

    setMinLegend(
      state,
      action: { type: string; payload: { questionIndex: number; value: string } }
    ) {
      const { questionIndex, value } = action.payload;
      const stateMax = (state.questions[questionIndex] as QuestionScale | QuestionImgs).legend[1];
      (state.questions[questionIndex] as QuestionScale | QuestionImgs).legend = [value, stateMax];
    },

    setMaxLegend(
      state,
      action: { type: string; payload: { questionIndex: number; value: string } }
    ) {
      const { questionIndex, value } = action.payload;
      const stateMin = (state.questions[questionIndex] as QuestionScale | QuestionImgs).legend[0];
      (state.questions[questionIndex] as QuestionScale | QuestionImgs).legend = [stateMin, value];
    },

    // each modification of a question is always handled in a a way that keeps the proper structure of an object
    setQuestionData(
      state,
      action: {
        type: string;
        payload: { questionIndex: number; questionData: Partial<AnyQuestion> };
      }
    ) {
      const { questionIndex, questionData } = action.payload;
      const qState = state.questions[questionIndex];
      const qAction = action.payload.questionData as AnyQuestion;
      const type = questionData.type ?? qState.type;

      // 3 params are common for all, if not specified in action - keep them as they are in state
      const newQuestionBaseParams = {
        question: questionData.question ?? qState.question ?? "",
        required: questionData.required ?? qState.required ?? false,
        // questionIndex: questionData.questionIndex ?? qState.questionIndex,
      };

      if (type === "date") {
        (state.questions[questionIndex] as QuestionDate) = {
          ...newQuestionBaseParams,
          maxDate:
            (qAction as QuestionDate).maxDate ??
            (qState as QuestionDate).maxDate ??
            DEFAULT_MAX_DATE,
          minDate:
            (qAction as QuestionDate).minDate ??
            (qState as QuestionDate).minDate ??
            DEFAULT_MIN_DATE,
          type: "date",
        };
      }

      if (type === "images") {
        (state.questions[questionIndex] as QuestionImgs) = {
          ...newQuestionBaseParams,
          legend:
            (qAction as QuestionImgs).legend ??
            (qState as QuestionImgs).legend ??
            DEFAULT_IMAGES.legend,
          type: "images",
        };
      }

      if (type === "multi") {
        (state.questions[questionIndex] as QuestionCheckbox) = {
          ...newQuestionBaseParams,
          answers:
            (qAction as QuestionCheckbox).answers ??
            (qState as QuestionCheckbox).answers ??
            DEFAULT_MULTI.answers,
          type: "multi",
        };
      }

      if (type === "open") {
        (state.questions[questionIndex] as QuestionOpen) = {
          ...newQuestionBaseParams,
          type: "open",
          limit:
            (qAction as QuestionOpen).limit ??
            (qState as QuestionOpen).limit ??
            DEFAULT_CHARS_LIMIT,
        };
      }

      if (type === "scale") {
        (state.questions[questionIndex] as QuestionScale) = {
          ...newQuestionBaseParams,
          type: "scale",
          legend: (qAction as QuestionScale).legend ??
            (qState as QuestionScale).legend ?? [DEFAULT_MIN_SCALE, DEFAULT_MAX_SCALE],
          length:
            (qAction as QuestionScale).length ??
            (qState as QuestionScale).length ??
            DEFAULT_SCALE_LENGTH,
        };
      }

      if (type === "single") {
        (state.questions[questionIndex] as QuestionRadio) = {
          ...newQuestionBaseParams,
          type: "single",
          answers:
            (qAction as QuestionRadio).answers ??
            (qState as QuestionRadio).answers ??
            DEFAULT_SINGLE.answers,
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
