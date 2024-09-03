import { useState } from "react";
import Question from "./QuestionTypes/Question";
import htmlCode from "../assets/survey-html.txt?raw";
import cssCode from "../assets/survey-css.txt?raw";
import jsCode from "../assets/survey-js.txt?raw";

import Button from "@synerise/ds-button";
import InnerApp from "../InnerApp";
import { buildQuestions } from "../helper";
import createTemplate from "../API/createTemplate";

type QuestionType = {
  index: number;
};

const QuestionsForm = () => {
  const [questionsArr, setQuestionsArr] = useState<QuestionType[]>([{ index: Date.now() }]);
  const [previewOn, setIsPreviewOn] = useState(false);
  const [previewHtml, setPreviewHtml] = useState(htmlCode);
  const [previewCss, setPreviewCss] = useState(cssCode);
  const [previewJs, setPreviewJs] = useState(jsCode);

  const removeQuestion: (key: number) => void = (key: number) => {
    setQuestionsArr((prev) => prev.filter((q) => q.index !== key));
  };

  const addQuestion = () => {
    setQuestionsArr((prev) => [...prev, { index: Date.now() }]);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawFormData = new FormData(e.currentTarget as HTMLFormElement);
    const finalFormData = buildQuestions(rawFormData);

    setPreviewHtml(previewHtml);
    setPreviewCss(previewCss);
    setPreviewJs(previewJs.replace("**configQuestions**", JSON.stringify(finalFormData)));

    setIsPreviewOn(true);

    return;
    createTemplate(previewHtml, previewCss, previewJs, finalFormData);
  };

  const questions = questionsArr.map((el, i) => {
    return <Question key={el.index} index={el.index} removeQuestionHandler={removeQuestion} questionNo={i} />;
  });

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      {questions}
      <button type="button" onClick={() => addQuestion()}>
        Add question
      </button>
      <br />
      <br />
      <button>Submit</button>

      {previewOn && <InnerApp html={previewHtml} css={previewCss} js={previewJs} />}

      <Button>Submit</Button>
    </form>
  );
};

export default QuestionsForm;
