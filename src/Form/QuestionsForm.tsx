import { useState } from "react";
import Question from "./Question";

type QuestionType = {
  index: number;
};

const QuestionsForm = () => {
  const [questionsArr, setQuestionsArr] = useState<QuestionType[]>([{ index: Date.now() }]);

  const removeQuestion: (key: number) => void = (key: number) => {
    setQuestionsArr((prev) => prev.filter((q) => q.index !== key));
  };

  const addQuestion = () => {
    setQuestionsArr((prev) => [...prev, { index: Date.now() }]);
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    for (const [key, value] of formData.entries()) {
      console.log(key, "---", value);
    }
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
    </form>
  );
};

export default QuestionsForm;
