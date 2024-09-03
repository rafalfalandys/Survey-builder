import ScaleLegend from "../SettingsComponents/ScaleLegend";

type QuestionImagesProps = {
  questionNo: number;
};

const QuestionImages: React.FC<QuestionImagesProps> = ({ questionNo }) => {
  return (
    <>
      <ScaleLegend questionNo={questionNo} />;
      <br />
    </>
  );
};

export default QuestionImages;
