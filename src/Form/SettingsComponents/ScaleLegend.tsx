import { Input } from "@synerise/ds-input";
import { useDispatch, useSelector } from "react-redux";
import { surveyActions } from "../../store/survey-slice";
import { RootState } from "../../store";
import { QuestionImgs, QuestionScale } from "../../types";
import { DEFAULT_MAX_SCALE, DEFAULT_MIN_SCALE } from "../../config";

const ScaleLegend: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const dispatch = useDispatch();
  const questionData = useSelector((state: RootState) => state.survey.questions)[questionIndex] as
    | QuestionScale
    | QuestionImgs;

  const legendMinHandler: React.ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(
      surveyActions.setQuestionData({ questionIndex, questionData: { legend: [value, questionData.legend[1]] } })
    );
  };

  const legendMaxHandler: React.ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(
      surveyActions.setQuestionData({ questionIndex, questionData: { legend: [questionData.legend[0], value] } })
    );
  };

  return (
    <>
      <Input
        type="text"
        onChange={legendMinHandler}
        defaultValue={DEFAULT_MIN_SCALE}
        onInput={() => {}}
        label="Legend - min:"
      />
      <Input type="text" onChange={legendMaxHandler} defaultValue={DEFAULT_MAX_SCALE} label="Legend - max:" />
    </>
  );
};

export default ScaleLegend;
