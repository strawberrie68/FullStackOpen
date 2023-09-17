const StatisticLine = (props) => {
  return (
    <div>
      <p>
        {props.text} {props.value} {props.text === "positive" ? "%" : ""}
      </p>
    </div>
  );
};

export default StatisticLine;
