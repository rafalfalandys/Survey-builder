import ScaleLegend from "../SettingsComponents/ScaleLegend";

type QuestionImagesProps = {
  questionIndex: number;
};

const QuestionImages: React.FC<QuestionImagesProps> = ({ questionIndex }) => {
  return <ScaleLegend questionIndex={questionIndex} />;
};

export default QuestionImages;
