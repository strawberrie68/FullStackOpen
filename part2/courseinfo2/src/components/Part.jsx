const Part = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        {props.name} {props.exercise}
      </p>
    </div>
  );
};

export default Part;
