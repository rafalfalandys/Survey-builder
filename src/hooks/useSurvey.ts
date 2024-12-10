import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { surveyActions } from "../store/survey-slice";
import { AnyQuestion } from "../types";

const useSurvey = () => {
  const dispatch = useDispatch();
  const surveyData = useSelector((state: RootState) => state.survey.questions);

  const setSurveyData = (questionsData: string) => {
    try {
      const parsedQuestions = JSON.parse(questionsData) as AnyQuestion[];
      dispatch(surveyActions.setQuestions([]));
      parsedQuestions.forEach((el, i) => {
        dispatch(surveyActions.setQuestionData({ questionIndex: i, questionData: el }));
      });
    } catch (error) {
      console.error("Invalid questionsData", error);
    }
  };

  return { surveyData, setSurveyData };
};

export default useSurvey;
