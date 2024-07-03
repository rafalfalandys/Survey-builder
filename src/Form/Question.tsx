import { ChangeEvent, useState } from "react";
import Answer from "./SettingsForm/Answer";
import TextLimit from "./SettingsForm/TextLimit";
import ScaleLegend from "./SettingsForm/ScaleLegend";
import ScaleLength from "./SettingsForm/ScaleLength";

type QuestionComp = {
  removeQuestionHandler: (index: number) => void;
  index: number;
  questionNo: number;
};

type AnswerIndex = {
  index: number;
  no: number;
};

const Question: React.FC<QuestionComp> = ({ index, removeQuestionHandler, questionNo }) => {
  const [type, setType] = useState("");
  const [answersIndexes, setAnswersIndexes] = useState<AnswerIndex[]>([
    { index: Date.now(), no: 0 },
    { index: Date.now() + 1, no: 1 },
  ]);

  const changeHandler = (e: ChangeEvent) => {
    const selectEl = e.target as HTMLSelectElement;
    setType(selectEl.value);
  };

  const addAnswer = () => {
    setAnswersIndexes((prev) => [...prev, { index: Date.now(), no: prev.length }]);
  };

  const removeAnswer = (index: number) => {
    setAnswersIndexes((prev) => prev.filter((el) => el.index !== index));
  };

  const getSettings = (type: string) => {
    if (type === "multi") {
      const answers = answersIndexes.map((el, i) => {
        return (
          <Answer
            key={el.index}
            index={el.index}
            questionNo={questionNo}
            answerNo={i}
            removeAnswerHandler={removeAnswer}
          />
        );
      });

      return (
        <>
          {answers}
          <button type="button" onClick={() => addAnswer()}>
            +
          </button>
          <br />
        </>
      );
    }
    if (type === "single") {
      const answers = answersIndexes.map((el, i) => {
        return (
          <Answer
            key={el.index}
            index={el.index}
            questionNo={questionNo}
            answerNo={i}
            removeAnswerHandler={removeAnswer}
          />
        );
      });

      return (
        <>
          {answers}
          <button type="button" onClick={() => addAnswer()}>
            +
          </button>
          <br />
        </>
      );
    }

    if (type === "text") {
      return (
        <>
          <TextLimit questionNo={questionNo} />
          <br />
        </>
      );
    }

    if (type === "scale") {
      return (
        <>
          <ScaleLength questionNo={questionNo} />
          <br />
          <ScaleLegend questionNo={questionNo} />
          <br />
        </>
      );
    }

    if (type === "images")
      return (
        <>
          <ScaleLegend questionNo={questionNo} />;
          <br />
        </>
      );
  };

  const questionId = `${questionNo}--question`;
  const requiredId = `${questionNo}--required`;
  const typeId = `${questionNo}--type`;

  return (
    <div>
      <label htmlFor={questionId}>Question {questionNo + 1}:</label>
      <input type="text" id={questionId} name={questionId} />
      <br />

      <label htmlFor={requiredId}>Required:</label>
      <input type="checkbox" id={requiredId} name={requiredId} />
      <br />

      <label htmlFor={typeId}>Type</label>

      <select name={typeId} id={typeId} onChange={changeHandler} defaultValue="">
        <option disabled hidden value="">
          select type
        </option>
        <option value="multi">Multiple choice</option>
        <option value="single">Single choice</option>
        <option value="text">Open</option>
        <option value="scale">Scale</option>
        <option value="images">Images</option>
      </select>
      <br />

      {getSettings(type)}

      <button type="button" onClick={() => removeQuestionHandler(index)}>
        Remove question
      </button>
      <br />
      <br />
    </div>
  );
};

export default Question;
