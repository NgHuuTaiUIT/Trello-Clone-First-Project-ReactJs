import React, { useState, useEffect } from "react";
import "./BoardContent.scss";
import Column from "components/Column/Column";
import { mapOrder } from "utilities/sort";
import { initialData } from "actions/initialData";
import { isEmpty } from "lodash";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/utils";
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
  let isResetColumn = false;
  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      /// Add Columns
      // dropResult.removedIndex
      //   ? (isResetColumn = true)
      //   : (isResetColumn = false);
      console.log(dropResult);
      let newColumns = [...columns];
      let currentColumn = newColumns.find((item) => item.id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((item) => item.id);
      // if (isResetColumn) setColumns(newColumns);
      setColumns(newColumns);
    }
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
              <Column column={column} onCardDrop={onCardDrop} />
            </Draggable>
          );
        })}
      </Container>
      <div className="btn-add-cl">
        <i className="fa fa-plus icon" /> Add New Column
      </div>
    </div>
  );
}
export default BoardContent;
