import { useState } from "react";
import { Input } from "@synerise/ds-input";
import Button from "@synerise/ds-button";
import { DEFAULT_CHARS_LIMIT } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { surveyActions } from "../../store/survey-slice";
import { RootState } from "../../store";
import { QuestionCheckbox, QuestionRadio } from "../../types";
import classes from "./ClosedAnswer.module.scss";

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
    const { checked } = e.target as HTMLInputElement;
    setIsOpen(checked);
    const answers = [...questionData.answers];
    const options = answers[answerNo].options;
    answers[answerNo] = { ...answers[answerNo], options: { ...options, isOpen: checked } };
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { answers } }));
  };

  const limitHandler = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    const answers = [...questionData.answers];
    const options = answers[answerNo].options;
    answers[answerNo] = { ...answers[answerNo], options: { ...options, limit: +value } };
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { answers } }));
  };

  return (
    <div className="survey__text-question__wrapper">
      <Input
        label={`Answer ${answerNo + 1}`}
        onChange={answerTextHandler}
        className="survey__text-input"
        value={questionData.answers[answerNo].answer}
      />
      <Button type="button" onClick={() => removeAnswerHandler(index)} className={classes.button}>
        -
      </Button>
      <Input
        type="checkbox"
        onChange={isOpenHandler}
        label="Is open?"
        className="survey__checkbox"
        // checked={questionData.answers[answerNo].options.isOpen}
      />
      {isOpen && <Input type="number" defaultValue={DEFAULT_CHARS_LIMIT} label="Limit:" onChange={limitHandler} />}
      <br />
    </div>
  );
};

export default ClosedAnswer;
