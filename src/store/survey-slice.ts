import { createSlice } from "@reduxjs/toolkit";
import {
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
  DEFAULT_SHUFFLE_ANSWERS,
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
    setQuestions(state, action: { type: string; payload: AnyQuestion[] }) {
      state.questions = action.payload;
    },

    removeQuestion(state, action) {
      state.questions = state.questions.filter((el) => el.questionId !== action.payload);
    },

    addQuestion(state) {
      state.questions.push(EMPTY_QUESTION);
    },

    setQuestionOrder(
      state,
      action: { type: string; payload: { questionIndex: number; newQuestionIndex: number } }
    ) {
      const { questionIndex, newQuestionIndex } = action.payload;
      const question = state.questions[questionIndex];
      const questionsFiltered = state.questions.filter((_, i) => i !== questionIndex);
      const questionsBefore = questionsFiltered.slice(0, newQuestionIndex);
      const questionsAfter = questionsFiltered.slice(newQuestionIndex);
      let newQuestions;

      if (newQuestionIndex === -1) {
        newQuestions = [...questionsBefore, ...questionsAfter, question];
      } else if (newQuestionIndex > questionsFiltered.length) {
        newQuestions = [question, ...questionsBefore, ...questionsAfter];
      } else {
        newQuestions = [...questionsBefore, question, ...questionsAfter];
      }

      if (newQuestions) state.questions = newQuestions;
    },

    removeAnswer(
      state,
      action: { type: string; payload: { questionIndex: number; answerIndex: number } }
    ) {
      const { questionIndex, answerIndex } = action.payload;
      const newAnswers = (
        state.questions[questionIndex] as QuestionRadio | QuestionCheckbox
      ).answers.filter((_, i) => i !== answerIndex);

      (state.questions[questionIndex] as QuestionRadio | QuestionCheckbox).answers = newAnswers;
    },

    addAnswer(state, action: { type: string; payload: { questionIndex: number } }) {
      const { questionIndex } = action.payload;
      (state.questions[questionIndex] as QuestionRadio | QuestionCheckbox).answers.push(
        EMPTY_ANSWER
      );
    },

    setAnswerText(
      state,
      action: {
        type: string;
        payload: { questionIndex: number; answerIndex: number; value: string };
      }
    ) {
      const { questionIndex, answerIndex, value } = action.payload;

      (state.questions[questionIndex] as QuestionRadio | QuestionCheckbox).answers[
        answerIndex
      ].answer = value;
    },

    setAnswerOptions(
      state,
      action: {
        type: string;
        payload: {
          questionIndex: number;
          answerIndex: number;
          optionsData: Partial<AnswerOptions>;
        };
      }
    ) {
      const { questionIndex, answerIndex, optionsData } = action.payload;

      const newOptions = {
        ...(state.questions[questionIndex] as QuestionRadio | QuestionCheckbox).answers[answerIndex]
          .options,
        ...optionsData,
      };

      (state.questions[questionIndex] as QuestionRadio | QuestionCheckbox).answers[
        answerIndex
      ].options = newOptions;
    },

    setAnswerOrder(
      state,
      action: {
        type: string;
        payload: { questionIndex: number; answerIndex: number; newAnswerIndex: number };
      }
    ) {
      const { questionIndex, answerIndex, newAnswerIndex } = action.payload;
      const question = state.questions[questionIndex] as QuestionRadio | QuestionCheckbox;
      const answer = question.answers[answerIndex];

      const answersFiltered = question.answers.filter((_, i) => i !== answerIndex);
      const answersBefore = answersFiltered.slice(0, newAnswerIndex);
      const questionsAfter = answersFiltered.slice(newAnswerIndex);

      let newAnswers;

      if (newAnswerIndex === -1) {
        newAnswers = [...answersBefore, ...questionsAfter, answer];
      } else if (newAnswerIndex > answersFiltered.length) {
        newAnswers = [answer, ...answersBefore, ...questionsAfter];
      } else {
        newAnswers = [...answersBefore, answer, ...questionsAfter];
      }

      if (newAnswers)
        (state.questions[questionIndex] as QuestionRadio | QuestionCheckbox).answers = newAnswers;
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
      const type = questionData.type ?? qState.type;

      // 3 params are common for all, if not specified in action - keep them as they are in state
      const newQuestionBaseParams = {
        question: questionData.question ?? qState.question ?? "",
        required: questionData.required ?? qState.required ?? false,
        questionId: questionData.questionId ?? qState?.questionId ?? Math.random(),
      };

      if (type === "date") {
        (state.questions[questionIndex] as QuestionDate) = {
          ...newQuestionBaseParams,
          maxDate:
            (questionData as QuestionDate).maxDate ??
            (qState as QuestionDate).maxDate ??
            DEFAULT_MAX_DATE,
          minDate:
            (questionData as QuestionDate).minDate ??
            (qState as QuestionDate).minDate ??
            DEFAULT_MIN_DATE,
          type: "date",
        };
      }

      if (type === "images") {
        (state.questions[questionIndex] as QuestionImgs) = {
          ...newQuestionBaseParams,
          legend:
            (questionData as QuestionImgs).legend ??
            (qState as QuestionImgs).legend ??
            DEFAULT_IMAGES.legend,
          type: "images",
        };
      }

      if (type === "multi") {
        (state.questions[questionIndex] as QuestionCheckbox) = {
          ...newQuestionBaseParams,
          answers:
            (questionData as QuestionCheckbox).answers ??
            (qState as QuestionCheckbox).answers ??
            DEFAULT_MULTI.answers,
          type: "multi",
          shuffleAnswers:
            (questionData as QuestionCheckbox).shuffleAnswers ?? DEFAULT_SHUFFLE_ANSWERS,
        };
      }

      if (type === "open") {
        (state.questions[questionIndex] as QuestionOpen) = {
          ...newQuestionBaseParams,
          type: "open",
          limit:
            (questionData as QuestionOpen).limit ??
            (qState as QuestionOpen).limit ??
            DEFAULT_CHARS_LIMIT,
        };
      }

      if (type === "scale") {
        (state.questions[questionIndex] as QuestionScale) = {
          ...newQuestionBaseParams,
          type: "scale",
          legend: (questionData as QuestionScale).legend ??
            (qState as QuestionScale).legend ?? [DEFAULT_MIN_SCALE, DEFAULT_MAX_SCALE],
          length:
            (questionData as QuestionScale).length ??
            (qState as QuestionScale).length ??
            DEFAULT_SCALE_LENGTH,
        };
      }

      if (type === "single") {
        (state.questions[questionIndex] as QuestionRadio) = {
          ...newQuestionBaseParams,
          type: "single",
          answers:
            (questionData as QuestionRadio).answers ??
            (qState as QuestionRadio).answers ??
            DEFAULT_SINGLE.answers,
          shuffleAnswers: (questionData as QuestionRadio).shuffleAnswers ?? DEFAULT_SHUFFLE_ANSWERS,
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
