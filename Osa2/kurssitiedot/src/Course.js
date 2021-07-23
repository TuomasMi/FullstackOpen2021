import React from "react";

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content course={course} />
      <Total exercises={course.parts.map((part) => part.exercises)} />
    </div>
  );
};

const Header = (props) => {
  return <h2>{props.header}</h2>;
};

const Content = ({ course }) => {
  return (
    <ul style={{ listStyleType: "none" }}>
      {course.parts.map((part) => (
        <li key={part.id}>
          <Part name={part.name} exercises={part.exercises} />
        </li>
      ))}
    </ul>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Total = (props) => {
  return (
    <p>
      <b>total of {props.exercises.reduce((a, b) => a + b)} exercises </b>
    </p>
  );
};

export default Course;
