import React from "react";

function Student(props) {
  return (
    <div key={props.student.id}>
      <div>{props.student.firstname}</div>
      <div>{props.student.surname}</div>
      <div>{props.student.nationalId}</div>
    </div>
  );
}

export default Student;