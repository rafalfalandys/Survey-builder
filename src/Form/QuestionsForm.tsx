import Question from "./QuestionTypes/Question";

import Button from "@synerise/ds-button";
import { useDispatch, useSelector } from "react-redux";
import { surveyActions } from "../store/survey-slice";
import { RootState } from "../store";
import { generateEmptyQuestion } from "../helper";

const QuestionsForm = () => {
  const dispatch = useDispatch();
  const questionsData = useSelector((state: RootState) => state.survey.questions);

  const addQuestionHandler = () => {
    const question = generateEmptyQuestion(questionsData.length);
    dispatch(surveyActions.addQuestion(question));
  };

  const questions = questionsData.map((_, i) => {
    return <Question questionIndex={i} key={i} />;
  });

  console.log(questionsData);

  return (
    <form className="survey__form">
      {questions}
      <Button type="button" onClick={addQuestionHandler}>
        Add question
      </Button>
      <br />
      <br />
    </form>
  );
};

export default QuestionsForm;
