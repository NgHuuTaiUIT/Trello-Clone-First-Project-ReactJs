import React, { useState, useEffect, useRef } from "react";
import "./BoardContent.scss";
import Column from "components/Column/Column";
import FormBox from "components/FormBox/FormBox";
import { mapOrder } from "utilities/sort";
import { initialData } from "actions/initialData";
import { isEmpty } from "lodash";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/utils";
import { ACTION_REMOVE, ACTION_UPDATE, ACTION_ADD } from "utilities/constants";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const boardFromDB = initialData.board.find(
      (board) => board.id === "board-1"
    );
    if (boardFromDB) {
      setBoard(boardFromDB);

      // sort column

      setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
      //   setColumns(boardFromDB.columns);
    }
  }, []);
  console.log("Board Content re-render");

  if (isEmpty(board)) {
    return <div className="not-found">Not Found</div>;
  }
  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    let newBoards = { ...board };

    newBoards.columnOrder = newColumns.map((c) => c.id);
    newBoards.columns = newColumns;
    setColumns(newColumns);
    setBoard(newBoards);
  };
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      /// Add Columns
      // dropResult.removedIndex
      //   ? (isResetColumn = true)
      //   : (isResetColumn = false);
      let newColumns = [...columns];
      let currentColumn = newColumns.find((item) => item.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((item) => item.id);
      // if (isResetColumn) setColumns(newColumns);
      setColumns(newColumns);
    }
  };

  const handleNameColumn = (e) => {
    console.log(e.target.value);
    // setNameColumn(e.target.value);
  };

  const onUpdateColumn = (type, columnUpdate) => {
    let newColumns = [...columns];
    let newBoards = { ...board };

    const newColumnsIndex = newColumns.findIndex(
      (item) => item.id === columnUpdate.id
    );
    if (type === ACTION_ADD) {
      newColumns.push(columnUpdate);
    }
    if (type === ACTION_UPDATE) {
      newColumns.splice(newColumnsIndex, 1, columnUpdate);
    }
    if (type === ACTION_REMOVE) {
      newColumns.splice(newColumnsIndex, 1);
    }
    newBoards.columnOrder = newColumns.map((c) => c.id);
    newBoards.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoards);
  };

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={(index) => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview",
        }}
      >
        {columns.map((column, index) => {
          return (
            <Draggable key={index}>
              <Column
                column={column}
                onCardDrop={onCardDrop}
                onUpdateColumn={onUpdateColumn}
              />
            </Draggable>
          );
        })}
      </Container>
      <FormBox
        // boardState={[board, setBoard]}
        // columnsState={[columns, setColumns]}
        board={board}
        onUpdateColumn={onUpdateColumn}
      />
    </div>
  );
}
export default BoardContent;
