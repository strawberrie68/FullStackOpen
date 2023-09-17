import Part from "./Part";

const Content = (props) => {
  console.log(props.parts);

  return (
    <div>
      {props.parts.map((element, index) => {
        return <Part name={element.name} exercise={element.exercies} />;
      })}
    </div>
  );
};

export default Content;
