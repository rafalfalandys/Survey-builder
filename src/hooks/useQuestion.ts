import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { surveyActions } from "../store/survey-slice";
import { SelectValue } from "antd/lib/select";
import { QuestionType } from "../types";

const useQuestion = (questionIndex: number) => {
  const dispatch = useDispatch();
  const questionData = useSelector((state: RootState) => state.survey.questions)[questionIndex];

  const questionTextHandler: React.ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { question: value } }));
  };

  const changeRequiredHandler: React.ChangeEventHandler = (e) => {
    const { checked } = e.target as HTMLInputElement;
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { required: checked } }));
  };

  const changeTypeHandler = (value: SelectValue) => {
    dispatch(
      surveyActions.setQuestionData({
        questionIndex,
        questionData: { type: value as QuestionType },
      })
    );
  };

  const removeQuestionHandler = (questionId: number) => {
    dispatch(surveyActions.removeQuestion(questionId));
  };

  const changeLimitHandler: React.ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { limit: +value } }));
  };

  const legendMinHandler: React.ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(surveyActions.setMinLegend({ questionIndex, value }));
  };

  const legendMaxHandler: React.ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(surveyActions.setMaxLegend({ questionIndex, value }));
  };

  const changeLengthHandler: React.ChangeEventHandler = (e) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(surveyActions.setQuestionData({ questionIndex, questionData: { length: +value } }));
  };

  const addAnswerHandler = () => {
    dispatch(surveyActions.addAnswer({ questionIndex }));
  };

  const shuffleAnswersHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target;
    dispatch(
      surveyActions.setQuestionData({ questionIndex, questionData: { shuffleAnswers: checked } })
    );
  };

  const moveQuestionHandler = (newQuestionIndex: number) => {
    dispatch(surveyActions.setQuestionOrder({ questionIndex, newQuestionIndex }));
  };

  return {
    questionData,
    questionTextHandler,
    changeRequiredHandler,
    changeTypeHandler,
    removeQuestionHandler,
    changeLimitHandler,
    legendMinHandler,
    legendMaxHandler,
    changeLengthHandler,
    addAnswerHandler,
    shuffleAnswersHandler,
    moveQuestionHandler,
  };
};

export default useQuestion;
