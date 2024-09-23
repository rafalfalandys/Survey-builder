import { Input } from "@synerise/ds-input";
import Button from "@synerise/ds-button";
import classes from "./ClosedAnswer.module.scss";
import useAnswer from "../../hooks/useAnswer";
//@ts-expect-error package has no types
import Icon, { AngleUpS, AngleDownS } from "@synerise/ds-icon";

type AnswerType = {
  questionIndex: number;
  answerIndex: number;
};

const ClosedAnswer: React.FC<AnswerType> = ({ questionIndex, answerIndex }) => {
  const {
    answerData,
    textHandler,
    isOpenHandler,
    removeAnswerHandler,
    limitHandler,
    endsSurveyHandler,
    changeOrderHandler,
  } = useAnswer(questionIndex, answerIndex);

  return (
    <div className="survey__flex--align-end">
      <Input
        label={`Answer ${answerIndex + 1}`}
        onChange={textHandler}
        className="survey__text-input"
        value={answerData.answer}
      />
      <Button type="button" onClick={removeAnswerHandler} className={classes.button}>
        -
      </Button>
      <Input
        type="checkbox"
        onChange={endsSurveyHandler}
        label="Ends survey?"
        className="survey__checkbox"
        checked={answerData.options.endsSurvey}
      />
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
      <div className={classes.orderArrows}>
        <Icon
          component={<AngleUpS />}
          color="#384350"
          onClick={changeOrderHandler.bind(null, answerIndex - 1)}
        />
        <Icon
          component={<AngleDownS />}
          color="#384350"
          onClick={changeOrderHandler.bind(null, answerIndex + 1)}
        />
      </div>
    </div>
  );
};

export default ClosedAnswer;
