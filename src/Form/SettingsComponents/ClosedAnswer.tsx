import { useState } from "react";
import { Input } from "@synerise/ds-input";
import Button from "@synerise/ds-button";
import { DEFAULT_CHARS_LIMIT } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { surveyActions } from "../../store/survey-slice";
import { RootState } from "../../store";
import { QuestionCheckbox, QuestionRadio } from "../../types";

type AnswerType = {
  index: number;
  questionIndex: number;
  answerNo: number;
  removeAnswerHandler: (index: number) => void;
};

const ClosedAnswer: React.FC<AnswerType> = ({ index, removeAnswerHandler, questionIndex, answerNo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const questionData = useSelector((state: RootState) => state.survey.questions)[questionIndex] as
    | QuestionRadio
    | QuestionCheckbox;

  const answerTextHandler: React.ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    const answers = [...questionData.answers];
    answers[answerNo] = { ...answers[answerNo], answer: value };
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { answers } }));
  };

  const isOpenHandler = (e: React.ChangeEvent) => {
    const check = (e.target as HTMLInputElement).checked;
    setIsOpen(check);
  };

  return (
    <>
      <Input label={`Answer ${answerNo + 1}`} autoResize onChange={answerTextHandler} />
      <Button type="button" onClick={() => removeAnswerHandler(index)}>
        -
      </Button>
      <Input type="checkbox" onChange={isOpenHandler} label="Is open?" autoResize />
      {isOpen && <Input type="number" defaultValue={DEFAULT_CHARS_LIMIT} label="Limit:" autoResize />}
      <br />
    </>
  );
};

export default ClosedAnswer;
