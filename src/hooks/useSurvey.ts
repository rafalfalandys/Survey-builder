import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { surveyActions } from "../store/survey-slice";

const useSurvey = () => {
  const dispatch = useDispatch();
  const surveyData = useSelector((state: RootState) => state.survey.questions);

  const setSurveyData = (questionsData: string) => {
    try {
      const parsedQuestions = JSON.parse(questionsData);
      dispatch(surveyActions.setQuestions(parsedQuestions));
    } catch (error) {
      console.error("Invalid questionsData", error);
    }
  };

  return { surveyData, setSurveyData };
};

export default useSurvey;
