import Part from "./Part";

const Content = ({ course }) => {
  const part = course;
  console.log(part);
  const total = Object.values(part).reduce(
    (total, { exercises }) => total + exercises,
    0
  );

  console.log(total);

  return (
    <div>
      {course.map((element) => {
        return (
          <Part
            key={element.id}
            name={element.name}
            exercise={element.exercises}
          />
        );
      })}

      <p>
        <strong>total of {total} exercise</strong>
      </p>
    </div>
  );
};

export default Content;
