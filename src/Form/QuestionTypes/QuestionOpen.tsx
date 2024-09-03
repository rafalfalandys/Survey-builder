import TextLimit from "../SettingsComponents/TextLimit";

type QuestionOpenProps = {
  questionNo: number;
};

const QuestionOpen: React.FC<QuestionOpenProps> = ({ questionNo }) => {
  {
    return (
      <>
        <TextLimit questionNo={questionNo} />
        <br />
      </>
    );
  }
};

export default QuestionOpen;
