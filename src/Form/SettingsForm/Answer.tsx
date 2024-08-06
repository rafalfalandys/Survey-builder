import { useState } from "react";
import TextLimit from "./TextLimit";

type AnswerType = {
  index: number;
  questionNo: number;
  answerNo: number;
  removeAnswerHandler: (index: number) => void;
};

const Answer: React.FC<AnswerType> = ({ index, removeAnswerHandler, questionNo, answerNo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isOpenHandler = (e: React.ChangeEvent) => {
    const check = (e.target as HTMLInputElement).checked;
    setIsOpen(check);
  };

  const answerId = `${questionNo}-${answerNo}--answer`;
  const isOpenId = `${questionNo}-${answerNo}--isOpen`;

  return (
    <>
      <label htmlFor={answerId}>Answer {answerNo + 1}:</label>
      <input type="text" id={answerId} name={answerId} />

      <button type="button" onClick={() => removeAnswerHandler(index)}>
        -
      </button>

      <label htmlFor={isOpenId}>Is open?</label>
      <input type="checkbox" id={isOpenId} name={isOpenId} onChange={(e) => isOpenHandler(e)} />

      {isOpen && <TextLimit questionNo={questionNo} answerNo={answerNo} />}
      <br />
    </>
  );
};

export default Answer;
