import { Input } from "@synerise/ds-input";
import { QuestionOpen as OpenType } from "../../types";
import useQuestion from "../../hooks/useQuestion";

type QuestionOpenProps = {
  questionIndex: number;
};

const QuestionOpen: React.FC<QuestionOpenProps> = ({ questionIndex }) => {
  const { questionData, changeLimitHandler } = useQuestion(questionIndex);

  return (
    <Input
      type="number"
      value={(questionData as OpenType).limit}
      label="Limit:"
      onChange={changeLimitHandler}
    />
  );
};

export default QuestionOpen;
