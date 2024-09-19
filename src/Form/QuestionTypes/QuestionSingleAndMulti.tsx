import { QuestionCheckbox, QuestionRadio } from "../../types";
import Answer from "../SettingsComponents/ClosedAnswer";
import Button from "@synerise/ds-button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { surveyActions } from "../../store/survey-slice";

type QuestionSingleAndMultiProps = {
  questionIndex: number;
};

const QuestionSingleAndMulti: React.FC<QuestionSingleAndMultiProps> = ({ questionIndex }) => {
  const questionData = useSelector(
    (state: RootState) => state.survey.questions[questionIndex] as QuestionRadio | QuestionCheckbox
  );
  const dispatch = useDispatch();

  const addAnswerHandler = () => {
    dispatch(surveyActions.addAnswer({ questionIndex }));
  };

  const answers = questionData.answers.map((_, i) => (
    <Answer questionIndex={questionIndex} answerIndex={i} key={i} />
  ));

  return (
    <>
      {answers}
      <Button type="button" onClick={addAnswerHandler}>
        +
      </Button>
      <br />
    </>
  );
};

export default QuestionSingleAndMulti;
