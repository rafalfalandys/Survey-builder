const ScaleLength: React.FC<{ questionNo: number }> = ({ questionNo }) => {
  const scaleLengthId = `${questionNo}--scale-length`;

  return (
    <>
      <label htmlFor={scaleLengthId}>Length:</label>
      <input type="number" id={scaleLengthId} name={scaleLengthId} defaultValue="5" />
    </>
  );
};

export default ScaleLength;
