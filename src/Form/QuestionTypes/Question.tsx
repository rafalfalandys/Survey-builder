import QuestionSingleAndMulti from "./QuestionSingleAndMulti";
import QuestionOpen from "./QuestionOpen";
import QuestionScale from "./QuestionScale";
import QuestionImages from "./QuestionImages";
import QuestionDate from "./QuestionDate";
import { useDispatch, useSelector } from "react-redux";
import { surveyActions } from "../../store/survey-slice";
import { RootState } from "../../store";
import { QuestionType } from "../../types";
import { Input } from "@synerise/ds-input";
import Select from "@synerise/ds-select/dist/Select";
import Button from "@synerise/ds-button";
import { SelectValue } from "antd/lib/select";

type QuestionComp = {
  questionIndex: number;
};

const Question: React.FC<QuestionComp> = ({ questionIndex }) => {
  const dispatch = useDispatch();
  const questionsData = useSelector((state: RootState) => state.survey.questions);

  const questionTextHandler: React.ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { question: value } }));
  };

  const changeRequiredHandler: React.ChangeEventHandler = (e) => {
    const { checked } = e.target as HTMLInputElement;
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { required: checked } }));
  };

  const changeTypeHandler = (value: SelectValue) => {
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { type: value as QuestionType } }));
  };

  const removeQuestionHandler = () => {
    dispatch(surveyActions.removeQuestion(questionIndex));
  };

  const selectQuestionType = () => {
    const type = questionsData[questionIndex].type;
    if (type === "multi" || type === "single") return <QuestionSingleAndMulti questionIndex={questionIndex} />;
    if (type === "open") return <QuestionOpen questionIndex={questionIndex} />;
    if (type === "scale") return <QuestionScale questionIndex={questionIndex} />;
    if (type === "images") return <QuestionImages questionIndex={questionIndex} />;
    if (type === "date") return <QuestionDate questionIndex={questionIndex} />;
  };

  const renderQuestionSettings = () => {
    const question = selectQuestionType();
    return (
      <>
        {question}
        <br />
      </>
    );
  };

  const { Option } = Select;

  return (
    <div>
      <Input type="text" label={`Question ${questionIndex + 1}:`} onChange={questionTextHandler} />
      <Input type="checkbox" label="Required:" onChange={changeRequiredHandler} />
      <Select defaultValue={questionsData[questionIndex].type} onChange={changeTypeHandler}>
        <Option disabled hidden value="empty">
          select type
        </Option>
        <Option value="multi">Multiple choice</Option>
        <Option value="single">Single choice</Option>
        <Option value="open">Open</Option>
        <Option value="scale">Scale</Option>
        <Option value="images">Images</Option>
        <Option value="date">Date</Option>
      </Select>

      {renderQuestionSettings()}

      <Button type="button" onClick={removeQuestionHandler}>
        Remove question
      </Button>
    </div>
  );
};

export default Question;
