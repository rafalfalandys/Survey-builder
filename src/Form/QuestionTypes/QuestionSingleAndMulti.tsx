import { useState } from "react";
import { AnswerIndex } from "../../types";
import Answer from "../SettingsComponents/ClosedAnswer";

type QuestionSingleAndMultiProps = {
  questionNo: number;
};

const QuestionSingleAndMulti: React.FC<QuestionSingleAndMultiProps> = ({ questionNo }) => {
  const [answersIndexes, setAnswersIndexes] = useState<AnswerIndex[]>([
    { index: Date.now(), no: 0 },
    { index: Date.now() + 1, no: 1 },
  ]);

  const addAnswer = () => {
    setAnswersIndexes((prev) => [...prev, { index: Date.now(), no: prev.length }]);
  };

  const removeAnswer = (index: number) => {
    setAnswersIndexes((prev) => prev.filter((el) => el.index !== index));
  };

  {
    const answers = answersIndexes.map((el, i) => (
      <Answer key={el.index} index={el.index} questionNo={questionNo} answerNo={i} removeAnswerHandler={removeAnswer} />
    ));

    return (
      <>
        {answers}
        <button type="button" onClick={() => addAnswer()}>
          +
        </button>
        <br />
      </>
    );
  }
};

export default QuestionSingleAndMulti;
