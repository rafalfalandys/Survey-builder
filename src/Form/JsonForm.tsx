import Button from "@synerise/ds-button";
import { TextArea } from "@synerise/ds-input";
import { Form } from "antd";
import useSurvey from "../hooks/useSurvey";
import sampleQuestions from "../assets/questions.json";
import { useEffect, useState } from "react";

const JsonForm: React.FC = () => {
  const [form] = Form.useForm();
  const [btnCopy, setBtnCopy] = useState("Copy json");
  const { setSurveyData, surveyData } = useSurvey();

  useEffect(() => {
    form.setFieldsValue({
      surveyData: JSON.stringify(surveyData, null, 2),
    });
  }, [surveyData, form]);

  const setSurveyDataHandler = (data: { surveyData: string }) => {
    setSurveyData(JSON.stringify([]));
    setSurveyData(data.surveyData);
  };

  const copyJsonHandler = () => {
    try {
      const formattedData = JSON.stringify(JSON.parse(form.getFieldValue("surveyData")));
      navigator.clipboard.writeText(formattedData).then(() => {
        setBtnCopy("Copied!");
        setTimeout(() => setBtnCopy("Copy Json"), 2000);
      });
    } catch (error) {
      console.error("Invalid JSON format:", error);
    }
  };

  return (
    <Form
      form={form}
      className="survey__form"
      onFinish={setSurveyDataHandler}
      initialValues={{
        surveyData: JSON.stringify(sampleQuestions),
      }}
    >
      <h3>JSON data (updated live):</h3>
      <Form.Item name="surveyData">
        <TextArea />
      </Form.Item>
      <Button htmlType="button" onClick={copyJsonHandler}>
        <strong>{btnCopy}</strong>
      </Button>
      <Button htmlType="submit">Set questions from pasted json</Button>
      <Button htmlType="button" onClick={() => setSurveyData(JSON.stringify(sampleQuestions))}>
        Set sample questions
      </Button>
    </Form>
  );
};

export default JsonForm;
