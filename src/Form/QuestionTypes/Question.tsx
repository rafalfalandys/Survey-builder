import QuestionSingleAndMulti from "./QuestionSingleAndMulti";
import QuestionOpen from "./QuestionOpen";
import QuestionScale from "./QuestionScale";
import QuestionImages from "./QuestionImages";
import QuestionDate from "./QuestionDate";
import { Input } from "@synerise/ds-input";
import Select from "@synerise/ds-select/dist/Select";
import Button from "@synerise/ds-button";
import useQuestion from "../../hooks/useQuestion";

type QuestionProps = {
  questionIndex: number;
};

const Question: React.FC<QuestionProps> = ({ questionIndex }) => {
  const {
    questionData,
    questionTextHandler,
    changeRequiredHandler,
    changeTypeHandler,
    removeQuestionHandler,
  } = useQuestion(questionIndex);

  const selectQuestionType = () => {
    const type = questionData.type;
    if (type === "multi" || type === "single")
      return <QuestionSingleAndMulti questionIndex={questionIndex} />;
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
    <div className="survey__question__wrapper">
      <div className="survey__text-question__wrapper">
        <Input
          type="text"
          label={`Question ${questionIndex + 1}:`}
          onChange={questionTextHandler}
          className="survey__text-input"
          value={questionData.question}
        />
        <Input
          type="checkbox"
          label="Required:"
          onChange={changeRequiredHandler}
          className="survey__checkbox"
          checked={questionData.required}
        />
      </div>
      <Select
        value={questionData.type}
        onChange={changeTypeHandler}
        label="Type"
        className="survey__select"
      >
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
