import { Input } from "@synerise/ds-input";
import useQuestion from "../../hooks/useQuestion";
import { QuestionScale } from "../../types";

const ScaleLegend: React.FC<{ questionIndex: number }> = ({ questionIndex }) => {
  const { questionData, legendMinHandler, legendMaxHandler } = useQuestion(questionIndex);

  return (
    <>
      <Input
        type="text"
        onChange={legendMinHandler}
        value={(questionData as QuestionScale).legend[0]}
        label="Legend - min:"
      />
      <Input
        type="text"
        onChange={legendMaxHandler}
        label="Legend - max:"
        value={(questionData as QuestionScale).legend[1]}
      />
    </>
  );
};

export default ScaleLegend;
