import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { surveyActions } from "../../store/survey-slice";
import { Input } from "@synerise/ds-input";

type QuestionDateProps = {
  questionIndex: number;
};

const QuestionDate: React.FC<QuestionDateProps> = ({ questionIndex }) => {
  const [isMinLimit, setIsMinLimit] = useState(false);
  const [isMaxLimit, setIsMaxLimit] = useState(false);
  const [isDateMinVisible, setIsDateMinVisible] = useState(true);
  const [isDateMaxVisible, setIsDateMaxVisible] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { type: "date" } }));
  }, [dispatch, questionIndex]);

  const changeDateHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { type } = e.target.dataset;
    const { value, checked } = e.target;

    if (type === "minDate") {
      dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { minDate: value } }));
    }
    if (type === "minDateToday") {
      setIsDateMinVisible(!checked);
      if (checked) dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { minDate: "today" } }));
      else dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { minDate: "" } }));
    }

    if (type === "maxDate") {
      dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { maxDate: value } }));
    }
    if (type === "maxDateToday") {
      setIsDateMaxVisible(!checked);
      if (checked) dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { maxDate: "today" } }));
      else dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { maxDate: "" } }));
    }
  };

  return (
    <>
      <Input type="checkbox" label="Minimum date limit" onChange={(e) => setIsMinLimit(e.target.checked)} />
      {isMinLimit && (
        <>
          {isDateMinVisible && <Input type="date" onChange={changeDateHandler} data-type="minDate" />}
          <Input
            type="checkbox"
            label="Day of taking the survey"
            onChange={changeDateHandler}
            data-type="minDateToday"
          />
        </>
      )}
      <Input type="checkbox" label="Maximum date limit" onChange={(e) => setIsMaxLimit(e.target.checked)} />
      {isMaxLimit && (
        <>
          {isDateMaxVisible && (
            <Input type="date" label="Maximum date" onChange={changeDateHandler} data-type="maxDate" />
          )}
          <Input
            type="checkbox"
            label="Day of taking the survey"
            onChange={changeDateHandler}
            data-type="maxDateToday"
          />
        </>
      )}
    </>
  );
};

export default QuestionDate;
