type TextLimitType = {
  questionNo: number;
  answerNo?: number;
};

const TextLimit: React.FC<TextLimitType> = ({ questionNo, answerNo }) => {
  const answerNumber = answerNo || answerNo === 0 ? `-${answerNo}` : "";
  const limitId = `${questionNo}${answerNumber}--limit`;

  return (
    <>
      <label htmlFor={limitId}>Limit:</label>
      <input type="number" id={limitId} name={limitId} defaultValue="20" />
    </>
  );
};

export default TextLimit;
