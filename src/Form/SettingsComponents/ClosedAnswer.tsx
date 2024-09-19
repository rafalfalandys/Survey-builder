import { Input } from "@synerise/ds-input";
import Button from "@synerise/ds-button";
import { useDispatch, useSelector } from "react-redux";
import { surveyActions } from "../../store/survey-slice";
import { RootState } from "../../store";
import { QuestionCheckbox, QuestionRadio } from "../../types";
import classes from "./ClosedAnswer.module.scss";

type AnswerType = {
  questionIndex: number;
  answerIndex: number;
};

const ClosedAnswer: React.FC<AnswerType> = ({ questionIndex, answerIndex }) => {
  const dispatch = useDispatch();
  const answerData = useSelector(
    (state: RootState) => state.survey.questions[questionIndex] as QuestionRadio | QuestionCheckbox
  ).answers[answerIndex];

  const answerTextHandler: React.ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(
      surveyActions.setAnswerData({ questionIndex, answerIndex, answerData: { answer: value } })
    );
  };

  const removeAnswerHandler = () => {
    dispatch(surveyActions.removeAnswer({ questionIndex, answerIndex }));
  };

  const isOpenHandler = (e: React.ChangeEvent) => {
    const { checked } = e.target as HTMLInputElement;
    dispatch(
      surveyActions.setAnswerOptions({ questionIndex, answerIndex, options: { isOpen: checked } })
    );
  };

  const limitHandler = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(
      surveyActions.setAnswerOptions({ questionIndex, answerIndex, options: { limit: +value } })
    );
  };

  return (
    <div className="survey__text-question__wrapper">
      <Input
        label={`Answer ${answerIndex + 1}`}
        onChange={answerTextHandler}
        className="survey__text-input"
        value={answerData.answer}
      />
      <Button type="button" onClick={removeAnswerHandler} className={classes.button}>
        -
      </Button>
      <Input
        type="checkbox"
        onChange={isOpenHandler}
        label="Is open?"
        className="survey__checkbox"
        checked={answerData.options.isOpen}
      />
      {answerData.options.isOpen && (
        <Input
          type="number"
          value={answerData.options.limit}
          label="Limit:"
          onChange={limitHandler}
        />
      )}
      <br />
    </div>
  );
};

export default ClosedAnswer;
