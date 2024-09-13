import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { surveyActions } from "../../store/survey-slice";
import ScaleLegend from "../SettingsComponents/ScaleLegend";

type QuestionImagesProps = {
  questionIndex: number;
};

const QuestionImages: React.FC<QuestionImagesProps> = ({ questionIndex }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      surveyActions.setQuestionData({ questionIndex, questionData: { type: "images", legend: ["Worst", "Best"] } })
    );
  }, [dispatch, questionIndex]);

  return <ScaleLegend questionIndex={questionIndex} />;
};

export default QuestionImages;
