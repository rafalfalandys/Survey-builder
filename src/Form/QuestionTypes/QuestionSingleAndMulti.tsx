import { QuestionCheckbox, QuestionRadio } from "../../types";
import Answer from "../SettingsComponents/ClosedAnswer";
import Button from "@synerise/ds-button";
import { Input } from "@synerise/ds-input";
import useQuestion from "../../hooks/useQuestion";

type QuestionSingleAndMultiProps = {
  questionIndex: number;
};

const QuestionSingleAndMulti: React.FC<QuestionSingleAndMultiProps> = ({ questionIndex }) => {
  const { questionData, addAnswerHandler, shuffleAnswersHandler } = useQuestion(questionIndex);
  const question = questionData as QuestionCheckbox | QuestionRadio;

  const answers = question.answers.map((_, i) => (
    <Answer questionIndex={questionIndex} answerIndex={i} key={i} />
  ));

  return (
    <>
      <Input
        type="checkbox"
        label="Shuffle answers"
        onChange={shuffleAnswersHandler}
        className="survey__checkbox"
        checked={question.shuffleAnswers}
      />
      {answers}
      <Button type="button" onClick={addAnswerHandler}>
        +
      </Button>
      <br />
    </>
  );
};

export default QuestionSingleAndMulti;
