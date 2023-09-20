const Total = (props) => {
  const totalArray = props.parts.map((part) => part.exercises);
  const total = totalArray.reduce((acc, c) => acc + c, 0);
  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

export default Total;
