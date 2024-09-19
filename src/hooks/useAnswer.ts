import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { QuestionCheckbox, QuestionRadio } from "../types";
import { surveyActions } from "../store/survey-slice";

const useAnswer = (questionIndex: number, answerIndex: number) => {
  const dispatch = useDispatch();
  const answerData = useSelector(
    (state: RootState) => state.survey.questions[questionIndex] as QuestionRadio | QuestionCheckbox
  ).answers[answerIndex];

  const textHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    dispatch(surveyActions.setAnswerText({ questionIndex, answerIndex, value }));
  };

  const isOpenHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target;
    dispatch(
      surveyActions.setAnswerOptions({
        questionIndex,
        answerIndex,
        optionsData: { isOpen: checked },
      })
    );
  };

  const removeAnswerHandler = () => {
    dispatch(surveyActions.removeAnswer({ questionIndex, answerIndex }));
  };

  const limitHandler = (e: React.ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    dispatch(
      surveyActions.setAnswerOptions({ questionIndex, answerIndex, optionsData: { limit: +value } })
    );
  };

  return {
    answerData,
    textHandler,
    isOpenHandler,
    removeAnswerHandler,
    limitHandler,
  };
};

export default useAnswer;
