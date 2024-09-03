import { ChangeEvent, useState } from "react";
import QuestionSingleAndMulti from "./QuestionSingleAndMulti";
import { QuestionType } from "../../types";
import QuestionOpen from "./QuestionOpen";
import QuestionScale from "./QuestionScale";
import QuestionImages from "./QuestionImages";
import QuestionDate from "./QuestionDate";

type QuestionComp = {
  removeQuestionHandler: (index: number) => void;
  index: number;
  questionNo: number;
};

const Question: React.FC<QuestionComp> = ({ index, removeQuestionHandler, questionNo }) => {
  const [type, setType] = useState<QuestionType | null>(null);

  const changeHandler = (e: ChangeEvent) => {
    const selectEl = e.target as HTMLSelectElement;
    setType(selectEl.value as QuestionType);
  };

  const selectQuestionType = () => {
    if (type === "multi" || type === "single") return <QuestionSingleAndMulti questionNo={questionNo} />;
    if (type === "open") return <QuestionOpen questionNo={questionNo} />;
    if (type === "scale") return <QuestionScale questionNo={questionNo} />;
    if (type === "images") return <QuestionImages questionNo={questionNo} />;
    if (type === "date") return <QuestionDate questionNo={questionNo} />;
  };

  const renderQuestion = () => {
    const question = selectQuestionType();

    return (
      <>
        {question}
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
        <option value="open">Open</option>
        <option value="scale">Scale</option>
        <option value="images">Images</option>
        <option value="date">Date</option>
      </select>
      <br />

      {type && renderQuestion()}

      <button type="button" onClick={() => removeQuestionHandler(index)}>
        Remove question
      </button>
      <br />
      <br />
    </div>
  );
};

export default Question;
