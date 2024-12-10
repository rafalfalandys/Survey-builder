import Question from "./QuestionTypes/Question";

import Button from "@synerise/ds-button";
import { useDispatch, useSelector } from "react-redux";
import { surveyActions } from "../store/survey-slice";
import { RootState } from "../store";
import { Form } from "antd";

const QuestionsForm = () => {
  const dispatch = useDispatch();
  const questionsData = useSelector((state: RootState) => state.survey.questions);

  const addQuestionHandler = () => {
    dispatch(surveyActions.addQuestion());
  };

  const questions = questionsData.map((el, i) => {
    return <Question questionIndex={i} questionId={el.questionId} key={el.questionId} />;
  });

  return (
    <>
      <Form className="survey__form" onValuesChange={(e) => console.log(e)}>
        {questions}
        <Button type="button" onClick={addQuestionHandler}>
          Add question
        </Button>
      </Form>
    </>
  );
};

export default QuestionsForm;
