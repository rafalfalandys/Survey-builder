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

  const questions = questionsData.map((el, i) => {
    return <Question questionIndex={i} questionId={el.questionId} key={el.questionId} />;
  });

  const setSurveyDataHandler = (data: { surveyData: string }) => {
    setSurveyData(data.surveyData);
  };

  console.log(questionsData);

  return (
    <>
      <Form className="survey__form" onValuesChange={(e) => console.log(e)}>
        {questions}
        <Button type="button" onClick={addQuestionHandler}>
          Add question
        </Button>
      </Form>

      <Form
        form={form}
        className="survey__form"
        onFinish={setSurveyDataHandler}
        onValuesChange={(e) => console.log(e)}
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
