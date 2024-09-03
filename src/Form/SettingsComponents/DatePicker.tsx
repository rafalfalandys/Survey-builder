type DatePickerProps = {
  questionNo: number;
};

const DatePicker: React.FC<DatePickerProps> = ({ questionNo }) => {
  const dateMinId = `${questionNo}--dateMin`;
  const dateMaxId = `${questionNo}--dateMax`;

  return (
    <>
      <label htmlFor={dateMinId}>Date - min:</label>
      <input type="date" id={dateMinId} name={dateMinId} defaultValue="Worst" />
      <label htmlFor={dateMaxId}>Date - max:</label>
      <input type="date" id={dateMaxId} name={dateMaxId} defaultValue="Best" />
    </>
  );
};

export default DatePicker;
