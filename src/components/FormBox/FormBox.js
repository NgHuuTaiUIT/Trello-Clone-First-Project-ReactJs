import React, { useState, useEffect, useRef } from "react";
import "./FormBox.scss";
import { ACTION_ADD } from "utilities/constants";

import {
  Container as BootstrapContainer,
  Row,
  Col,
  Form,
  Button
} from "react-bootstrap";

function FormBox(props) {
  console.log("Form Box re-render");
  //   const [board, setBoard] = props.boardState;
  //   const [columns, setColumns] = props.columnsState;
  const { board, onUpdateColumn } = props;

  const [formState, setFormState] = useState(false);
  const handleFormState = () => setFormState(!formState);

  const [nameColumn, setNameColumn] = useState("");

  const inputAddColumnRef = useRef(null);

  useEffect(() => {
    if (inputAddColumnRef && inputAddColumnRef.current) {
      inputAddColumnRef.current.focus();
      inputAddColumnRef.current.select();
    }
  }, [formState]);

  const handleAddNewColumn = () => {
    if (!nameColumn) {
      inputAddColumnRef.current.focus();
      return;
    }

    const newColumnAdded = {
      boardId: board._id,
      title: nameColumn.trim()
    };
    onUpdateColumn(ACTION_ADD, newColumnAdded);
    // let newColumns = [...columns];
    // newColumns.push(newColumnAdded);
    // let newBoards = { ...board };
    // newBoards.columnOrder = newColumns.map((c) => c._id);
    // newBoards.columns = newColumns;

    // setColumns(newColumns);
    // setBoard(newBoards);
    setNameColumn("");
    setFormState(false);
  };

  return (
    <BootstrapContainer className="bootstrap-container">
      <Row>
        {!formState && (
          <Col className="btn-add-cl" onClick={handleFormState}>
            <i className="fa fa-plus icon" /> Add New Column
          </Col>
        )}
      </Row>
      {formState && (
        <Row>
          <Col className="bg-input-name-cl">
            <Form.Control
              size="sm"
              type="text"
              placeholder="Add Name Column"
              id="input-name-cl"
              ref={inputAddColumnRef}
              value={nameColumn}
              onChange={(e) => setNameColumn(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddNewColumn();
              }}
            />
            <div className="box-btn">
              <Button
                variant="success"
                className="btn-success-add-cl"
                onClick={handleAddNewColumn}
              >
                Add column
              </Button>
              <span className="btn-cancel-new-cl" onClick={handleFormState}>
                <i className="fa fa-trash icon"></i>
              </span>
            </div>
          </Col>
        </Row>
      )}
    </BootstrapContainer>
  );
}
export default FormBox;
