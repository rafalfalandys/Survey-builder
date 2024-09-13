import { Input } from "@synerise/ds-input";
import { DEFAULT_CHARS_LIMIT } from "../../config";
import { useDispatch } from "react-redux";
import { surveyActions } from "../../store/survey-slice";

type QuestionOpenProps = {
  questionIndex: number;
};

const QuestionOpen: React.FC<QuestionOpenProps> = ({ questionIndex }) => {
  const dispatch = useDispatch();

  const changeHandler: React.ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { limit: +value } }));
  };

  return <Input type="number" defaultValue={DEFAULT_CHARS_LIMIT} label="Limit:" onChange={changeHandler} />;
};

export default QuestionOpen;
