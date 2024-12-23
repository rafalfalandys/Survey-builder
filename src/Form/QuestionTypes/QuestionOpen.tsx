import { Input } from "@synerise/ds-input";
import { QuestionOpen as OpenType } from "../../types";
import useQuestion from "../../hooks/useQuestion";

type QuestionOpenProps = {
  questionIndex: number;
};

const QuestionOpen: React.FC<QuestionOpenProps> = ({ questionIndex }) => {
  const { questionData, changeLimitHandler, changeUploadImgHandler } = useQuestion(questionIndex);

  return (
    <>
      <Input
        type="number"
        value={(questionData as OpenType).limit}
        label="Limit:"
        onChange={changeLimitHandler}
      />
      <Input
        type="checkbox"
        label="Image upload:"
        onChange={changeUploadImgHandler}
        className="survey__checkbox"
        checked={(questionData as OpenType).uploadImg}
      />
    </>
  );
};

export default QuestionOpen;
