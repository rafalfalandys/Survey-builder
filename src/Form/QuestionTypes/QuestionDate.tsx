import DatePicker from "../SettingsComponents/DatePicker";

type QuestionDateProps = {
  questionNo: number;
};

const QuestionDate: React.FC<QuestionDateProps> = ({ questionNo }) => {
  return <DatePicker questionNo={questionNo} />;
};

export default QuestionDate;
