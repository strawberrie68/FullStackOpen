import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  console.log(course);

  return (
    <div>
      <Header course={course} />
      <Content course={course.parts} />
    </div>
  );
};

export default Course;
