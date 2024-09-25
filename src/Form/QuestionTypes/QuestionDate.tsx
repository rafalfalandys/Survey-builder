import { useSelector } from "react-redux";
import { Input } from "@synerise/ds-input";
import { RootState } from "../../store";
import { QuestionDate as DateType } from "../../types";
import useDate from "../../hooks/useDate";

type QuestionDateProps = {
  questionIndex: number;
};

const QuestionDate: React.FC<QuestionDateProps> = ({ questionIndex }) => {
  const questionData = useSelector((state: RootState) => state.survey.questions)[
    questionIndex
  ] as DateType;

  const {
    isMinLimit,
    isMaxLimit,
    isDateMinVisible,
    isDateMaxVisible,
    showMinLimitHandler,
    showMaxLimitHandler,
    changeDateHandler,
  } = useDate(questionIndex);

  return (
    <>
      <Input
        type="checkbox"
        label="Minimum date limit"
        onChange={showMinLimitHandler}
        className="survey__checkbox"
        checked={isMinLimit}
      />
      {(isMinLimit || questionData.minDate) && (
        <>
          <Input
            type="checkbox"
            label="Day of taking the survey"
            onChange={changeDateHandler}
            data-type="minDateToday"
            className="survey__checkbox"
            checked={questionData.minDate === "today"}
          />
          {isDateMinVisible && (
            <Input
              type="date"
              onChange={changeDateHandler}
              data-type="minDate"
              value={questionData.minDate}
            />
          )}
        </>
      )}
      <Input
        type="checkbox"
        label="Maximum date limit"
        onChange={showMaxLimitHandler}
        className="survey__checkbox"
        checked={isMaxLimit}
      />
      {(isMaxLimit || questionData.maxDate) && (
        <>
          <Input
            type="checkbox"
            label="Day of taking the survey"
            onChange={changeDateHandler}
            data-type="maxDateToday"
            className="survey__checkbox"
            checked={questionData.maxDate === "today"}
          />
          {(isDateMaxVisible || (questionData.maxDate && questionData.maxDate !== "today")) && (
            <Input
              type="date"
              onChange={changeDateHandler}
              data-type="maxDate"
              value={questionData.maxDate}
            />
          )}
        </>
      )}
    </>
  );
};

export default QuestionDate;
