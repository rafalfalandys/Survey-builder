import { Input } from "@synerise/ds-input";
import { useSelector } from "react-redux";
import ScaleLegend from "../SettingsComponents/ScaleLegend";
import { QuestionScale as ScaleType } from "../../types";
import { RootState } from "../../store";
import useQuestion from "../../hooks/useQuestion";

type QuestionScaleProps = {
  questionIndex: number;
};

const QuestionScale: React.FC<QuestionScaleProps> = ({ questionIndex }) => {
  const questionData = useSelector((state: RootState) => state.survey.questions)[
    questionIndex
  ] as ScaleType;

  const { changeLengthHandler } = useQuestion(questionIndex);

  return (
    <>
      <Input
        type="number"
        onChange={changeLengthHandler}
        value={questionData.length}
        label="Length:"
      />
      <ScaleLegend questionIndex={questionIndex} />
    </>
  );
};

export default QuestionScale;
