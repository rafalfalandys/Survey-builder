import QuestionSingleAndMulti from "./QuestionSingleAndMulti";
import QuestionOpen from "./QuestionOpen";
import QuestionScale from "./QuestionScale";
import QuestionImages from "./QuestionImages";
import QuestionDate from "./QuestionDate";
import { Input } from "@synerise/ds-input";
import Select from "@synerise/ds-select/dist/Select";
import useQuestion from "../../hooks/useQuestion";
//@ts-expect-error package has no types
import Icon, { AngleUpM, AngleDownM, Remove2M } from "@synerise/ds-icon";
import classes from "./Question.module.scss";
import Collapse from "../../UI/Collapse";

type QuestionProps = {
  questionIndex: number;
  questionId: number;
};

const Question: React.FC<QuestionProps> = ({ questionIndex, questionId }) => {
  const {
    questionData,
    questionTextHandler,
    changeRequiredHandler,
    changeTypeHandler,
    removeQuestionHandler,
    moveQuestionHandler,
  } = useQuestion(questionIndex);

  const selectQuestionType = () => {
    const { type } = questionData;
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
    <div className={classes.questionContainer}>
      <div className={classes.question}>
        <div className={classes.textAndBtn}>
          <h5 className={classes.header}>{`${questionIndex + 1}. ${questionData.question}`}</h5>
        </div>
        <Collapse header={`Settings`}>
          <Input
            type="text"
            label="Question"
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
          <Select
            value={questionData.type}
            onChange={changeTypeHandler}
            label="Type"
            className={classes.type}
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
        </Collapse>
      </div>

      <div className={classes.orderButtons}>
        <Icon
          component={<AngleUpM />}
          color="#384350"
          onClick={moveQuestionHandler.bind(null, questionIndex - 1)}
        />
        <Icon
          component={<Remove2M />}
          color="#384350"
          onClick={removeQuestionHandler.bind(null, questionId)}
        />
        <Icon
          component={<AngleDownM />}
          color="#384350"
          onClick={moveQuestionHandler.bind(null, questionIndex + 1)}
        />
      </div>
    </div>
  );
};

export default Question;
