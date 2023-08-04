import React, { useState } from "react";
import StudentGridList from "./StudentGridList";
import StudentTableList from "./StudentTableList";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js";

function StudentList(props) {
  const [viewType, setViewType] = useState("grid");
  const isGrid = viewType === "grid";

  return (
    <div>
      <Navbar bg="light">
        <div className="container-fluid">
          <Navbar.Brand>List of students</Navbar.Brand>
          <Button
            variant="outline-primary"
            onClick={() =>
              setViewType((currentState) => {
                if (currentState === "grid") return "table";
                else return "grid";
              })
            }
          >
            <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
            {isGrid ? "Table" : "Grid"}
          </Button>
        </div>
      </Navbar>
      {isGrid ? (
        <StudentGridList studentList={props.studentList} />
      ) : (
        <StudentTableList studentList={props.studentList} />
      )}
    </div>
  );
}

export default StudentList;