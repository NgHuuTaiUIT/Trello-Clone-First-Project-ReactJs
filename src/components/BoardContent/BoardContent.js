import React, { useState, useEffect } from "react";
import "./BoardContent.scss";
import Column from "components/Column/Column";
import FormBox from "components/FormBox/FormBox";
import { isEmpty } from "lodash";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/utils";
import { ACTION_REMOVE, ACTION_UPDATE, ACTION_ADD } from "utilities/constants";
import {
  apiGetDataBoard,
  createNewCreateColumn,
  updateCard,
  updateColumn
} from "actions/getAPIs";

function BoardContent() {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);
  console.log("onColumnDrop newColumns", columns);
  console.log("onColumnDrop newBoards", board);

  useEffect(() => {
    // const boardFromDB = initialData.board.find(
    //   (board) => board._id === "board-1"
    // );
    // if (boardFromDB) {
    //   setBoard(boardFromDB);

    //   // sort column

    //   setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, "_id"));
    //   //   setColumns(boardFromDB.columns);
    // }
    apiGetDataBoard("6180fe0d0ce3303fe2a94359").then((res) => {
      const boardFromDB = res.data;
      console.log(boardFromDB);
      setBoard(boardFromDB);
      setColumns(boardFromDB.columns);
    });
  }, []);

  if (isEmpty(board)) {
    return <div className="not-found">Not Found</div>;
  }

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);
    let newBoards = { ...board };
    newBoards.columnOrder = newColumns.map((c) => c._id);
    newBoards.columns = newColumns;
    setColumns(newColumns);
    // console.log("onColumnDrop newColumns", newColumns);
    setBoard(newBoards);
    // console.log("onColumnDrop newBoards", newBoards);
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      //Thay đổi columnId cũ của card thành columnId mới
      if (dropResult.addedIndex !== null) {
        let card = { ...dropResult.payload, columnId: columnId };
        dropResult.payload = { ...card };
        updateCard(card._id, { columnId: columnId });
      }

      let newColumns = [...columns];
      let currentColumn = newColumns.find((item) => item._id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map((item) => item._id);
      handleColumnAction(ACTION_UPDATE, currentColumn);
      // if (isResetColumn) setColumns(newColumns);
      setColumns(newColumns);
    }
  };

  const handleColumnAction = (type, dataColumn, dataUpdate) => {
    let newColumns = [...columns];
    let newBoards = { ...board };

    const newColumnsIndex = newColumns.findIndex(
      (item) => item._id === dataColumn._id
    );
    if (type === ACTION_ADD) {
      createNewCreateColumn(dataUpdate).then((res) => {
        newColumns.push(res.data);
        setColumns(newColumns);
      });
    }
    if (type === ACTION_UPDATE) {
      updateColumn(dataColumn._id, dataUpdate).then((res) => {
        newColumns.splice(newColumnsIndex, 1, dataColumn);
        setColumns(newColumns);
      });
    }
    if (type === ACTION_REMOVE) {
      console.log(dataUpdate);
      updateColumn(dataColumn._id, dataUpdate).then((res) => {
        newColumns.splice(newColumnsIndex, 1);
        setColumns(newColumns);
      });
    }
    newBoards.columnOrder = newColumns.map((c) => c._id);
    newBoards.columns = newColumns;
    console.log("2", newColumns);
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
          className: "column-drop-preview"
        }}
      >
        {columns.map((column, index) => {
          console.log("Columns", column);
          return (
            <Draggable key={index}>
              <Column
                column={column}
                onCardDrop={onCardDrop}
                handleColumnAction={handleColumnAction}
              />
            </Draggable>
          );
        })}
      </Container>
      <FormBox
        // boardState={[board, setBoard]}
        // columnsState={[columns, setColumns]}
        board={board}
        handleColumnAction={handleColumnAction}
      />
    </div>
  );
}
export default BoardContent;
