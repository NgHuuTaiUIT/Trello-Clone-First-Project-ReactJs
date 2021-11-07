import React, { useState, useEffect } from "react";
import "./BoardContent.scss";
import Column from "components/Column/Column";
import FormBox from "components/FormBox/FormBox";
import { mapOrder } from "utilities/sort";
import { isEmpty, cloneDeep } from "lodash";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/utils";
import { ACTION_REMOVE, ACTION_UPDATE, ACTION_ADD } from "utilities/constants";
import {
  apiGetDataBoard,
  createNewColumn,
  updateBoard,
  updateCard,
  updateColumn
} from "actions/APIs";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    apiGetDataBoard().then((data) => {
      setBoard(data);
      const columnSorted = mapOrder(data.columns, data.columnOrder, "_id");
      setColumns(columnSorted);
      // setColumns(data.columns);
    });

    // const boardFromDB = initialData.board.find(
    //   (board) => board._id === "board-1"
    // );
    // if (boardFromDB) {
    //   setBoard(boardFromDB);

    //   // sort column

    //   setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "id"));
    //   setColumns(boardFromDB.columns);
  }, []);

  if (isEmpty(board)) {
    return <div className="not-found">Not Found</div>;
  }

  const onColumnDrop = (dropResult) => {
    if (dropResult.removedIndex === dropResult.addedIndex) return;
    let newColumns = cloneDeep(columns);
    newColumns = applyDrag(newColumns, dropResult);
    let newBoards = cloneDeep(board);

    newBoards.columnOrder = newColumns.map((c) => c._id);
    newBoards.columns = newColumns;

    //Call api update columnOrder in board detail
    setColumns(newColumns);

    updateBoard(newBoards._id, newBoards).catch((err) => {
      // setColumns(columns);
      // setBoard(board);
    });
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex === dropResult.addedIndex) return;
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      /// Add Columns
      // dropResult.removedIndex
      //   ? (isResetColumn = true)
      //   : (isResetColumn = false);
      let newColumns = cloneDeep(columns);
      let currentColumn = newColumns.find((item) => item._id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((item) => item._id);
      // const dataColumnUpdated = { cardOrder: currentColumn.cardOrder };
      setColumns(newColumns);
      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        /**
         * Action: Move card inside its column
         * Call api update cardOrder in current column
         */
        updateColumn(columnId, currentColumn).catch((err) => {
          setColumns(columns);
        });
      } else {
        /**
         * Action: Move card between two columns
         * Call api update cardOrder in current column
         * Call api update columnId of card
         */
        updateColumn(columnId, currentColumn).catch((err) => {
          setColumns(columns);
        });

        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload);
          currentCard.columnId = columnId;
          updateCard(currentCard._id, currentCard).catch((err) =>
            setColumns(columns)
          );
        }
      }
      // if (isResetColumn) setColumns(newColumns);
    }
  };

  const onUpdateColumn = (type, columnUpdate) => {
    let newColumns = [...columns];
    let newBoards = { ...board };

    const newColumnsIndex = newColumns.findIndex(
      (item) => item._id === columnUpdate._id
    );
    if (type === ACTION_ADD) {
      createNewColumn(columnUpdate).then((column) => {
        let newColumns = [...columns];
        let newBoards = { ...board };
        newColumns.push(column);
        newBoards.columnOrder = newColumns.map((c) => c._id);
        newBoards.columns = newColumns;
        setColumns(newColumns);
        setBoard(newBoards);
      });
      newColumns.push(columnUpdate);
    }
    if (type === ACTION_UPDATE) {
      newColumns.splice(newColumnsIndex, 1, columnUpdate);
    }
    if (type === ACTION_REMOVE) {
      newColumns.splice(newColumnsIndex, 1);
    }
    newBoards.columnOrder = newColumns.map((c) => c._id);
    newBoards.columns = newColumns;

    setColumns(newColumns);
    setBoard(newBoards);
  };

  // const onAddNewCardToColumn = (newColomn) => {
  //   let newColumns = [...columns];
  //   let newBoards = { ...board };

  //   const newColumnsIndex = newColumns.findIndex(
  //     (item) => item._id === newColomn._id
  //   );
  //   newColumns.splice(newColumnsIndex, 1, newColomn);

  //   newBoards.columnOrder = newColumns.map((c) => c._id);
  //   newBoards.columns = newColumns;

  //   setColumns(newColumns);
  //   setBoard(newBoards);
  // };

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
          className: "column-drop-preview"
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
