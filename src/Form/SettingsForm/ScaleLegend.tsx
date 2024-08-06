const ScaleLegend: React.FC<{ questionNo: number }> = ({ questionNo }) => {
  const legendMinId = `${questionNo}--legendMin`;
  const legendMaxId = `${questionNo}--legendMax`;

  return (
    <>
      <label htmlFor={legendMinId}>Legend - min:</label>
      <input type="text" id={legendMinId} name={legendMinId} defaultValue="Worst" />
      <label htmlFor={legendMaxId}>Legend - max:</label>
      <input type="text" id={legendMaxId} name={legendMaxId} defaultValue="Best" />
    </>
  );
};

export default ScaleLegend;
