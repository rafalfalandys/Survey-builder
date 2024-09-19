import Question from "./QuestionTypes/Question";

import Button from "@synerise/ds-button";
import { useDispatch, useSelector } from "react-redux";
import { surveyActions } from "../store/survey-slice";
import { RootState } from "../store";
import { TextArea } from "@synerise/ds-input";
import { Form } from "antd";
import useSurvey from "../hooks/useSurvey";
import sampleQuestions from "../assets/questions.json";

const QuestionsForm = () => {
  const dispatch = useDispatch();
  const questionsData = useSelector((state: RootState) => state.survey.questions);
  const [form] = Form.useForm();
  const { setSurveyData } = useSurvey();

  const addQuestionHandler = () => {
    dispatch(surveyActions.addQuestion());
  };

  const questions = questionsData.map((_, i) => {
    return <Question questionIndex={i} key={i} />;
  });

  const setSurveyDataHandler = (data: { surveyData: string }) => {
    console.log(data);
    setSurveyData(data.surveyData);
  };

  console.log(questionsData);

  return (
    <>
      <form className="survey__form">
        {questions}
        <Button type="button" onClick={addQuestionHandler}>
          Add question
        </Button>
      </form>

      <Form
        form={form}
        className="survey__form"
        onFinish={setSurveyDataHandler}
        initialValues={{
          surveyData: JSON.stringify(sampleQuestions, null, 2),
        }}
      >
        <Form.Item name="surveyData">
          <TextArea />
        </Form.Item>
        <Button htmlType="submit">Set survey data</Button>
      </Form>
    </>
  );
};

export default QuestionsForm;
