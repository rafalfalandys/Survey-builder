import { Input } from "@synerise/ds-input";
import { DEFAULT_SCALE_LENGTH } from "../../config";
import { useDispatch } from "react-redux";
import { surveyActions } from "../../store/survey-slice";
import ScaleLegend from "../SettingsComponents/ScaleLegend";

type QuestionScaleProps = {
  questionIndex: number;
};

const QuestionScale: React.FC<QuestionScaleProps> = ({ questionIndex }) => {
  const dispatch = useDispatch();

  const changeLengthHandler: React.ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { length: +value } }));
  };

  return (
    <>
      <Input type="number" onChange={changeLengthHandler} defaultValue={DEFAULT_SCALE_LENGTH} label="Length:" />
      <ScaleLegend questionIndex={questionIndex} />
    </>
  );
};

export default QuestionScale;
