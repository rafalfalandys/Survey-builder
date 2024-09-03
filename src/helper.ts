import { AnyQuestion, QuestionCheckbox, QuestionRadio, QuestionScale } from "./types";

type Replacement = { id: string; value: string };

export function replaceVariables(str: string, replacements: Replacement[]) {
  return str.replace(/####(.*?)!####/g, (match) => {
    const replaceObj = replacements.find((el) => match.includes(el.id));
    return replaceObj?.value || match;
  });
}

export function buildQuestions(rawFormData: FormData) {
  const finalFormData: AnyQuestion[] = [];

  for (const [key, value] of rawFormData.entries()) {
    const indexArr = key.split("--")[0].split("-");
    const questionIndex = +indexArr[0];
    const answerIndex = +indexArr[1];
    const keyName = key.split("--")[1];
    const val = isNaN(+value) ? (value as string) : +value;

    // make sure formDataArr is not empty at current question index
    finalFormData[questionIndex] = finalFormData[questionIndex] || {};

    // build answers array
    if (answerIndex || answerIndex === 0) {
      const curQuestion = finalFormData[questionIndex] as QuestionCheckbox | QuestionRadio;

      // make sure answers array is not empty
      curQuestion.answers = curQuestion.answers || [];
      curQuestion.answers[answerIndex] = curQuestion.answers[answerIndex] || { answer: "" };

      // @ts-expect-error there are many keynames and I want to skip specifing them here
      curQuestion.answers[answerIndex][keyName] = val;
    } else if (keyName === "required") {
      finalFormData[questionIndex].required = val === "on";
    } else if (keyName === "legendMin" || keyName === "legendMax") {
      const curQuestion = finalFormData[questionIndex] as QuestionScale;
      curQuestion.legend = curQuestion.legend || [];
      if (keyName === "legendMin") curQuestion.legend[0] = val as string;
      if (keyName === "legendMax") curQuestion.legend[1] = val as string;
    } else {
      // @ts-expect-error there are many keynames and I want to skip specifing them here
      finalFormData[questionIndex][keyName] = val;
    }
  }

  return finalFormData;
}
