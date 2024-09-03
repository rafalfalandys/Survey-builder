import ScaleLegend from "../SettingsComponents/ScaleLegend";
import ScaleLength from "../SettingsComponents/ScaleLength";

type QuestionScaleProps = {
  questionNo: number;
};

const QuestionScale: React.FC<QuestionScaleProps> = ({ questionNo }) => {
  return (
    <>
      <ScaleLength questionNo={questionNo} />
      <br />
      <ScaleLegend questionNo={questionNo} />
      <br />
    </>
  );
};

export default QuestionScale;
