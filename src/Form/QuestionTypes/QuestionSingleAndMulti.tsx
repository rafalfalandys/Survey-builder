import { useState } from "react";
import { AnswerIndex } from "../../types";
import Answer from "../SettingsComponents/ClosedAnswer";
import Button from "@synerise/ds-button";

type QuestionSingleAndMultiProps = {
  questionIndex: number;
};

const QuestionSingleAndMulti: React.FC<QuestionSingleAndMultiProps> = ({ questionIndex }) => {
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
      <Answer
        key={el.index}
        index={el.index}
        questionIndex={questionIndex}
        answerNo={i}
        removeAnswerHandler={removeAnswer}
      />
    ));

    return (
      <>
        {answers}
        <Button type="button" onClick={() => addAnswer()}>
          +
        </Button>
        <br />
      </>
    );
  }
};

export default QuestionSingleAndMulti;
