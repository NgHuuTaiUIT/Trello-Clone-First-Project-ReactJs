import React, { useState, useEffect } from "react";
import "./BoardContent.scss";
import Column from "components/Column/Column";
import FormBox from "components/FormBox/FormBox";
import { mapOrder } from "utilities/sort";
import { isEmpty, cloneDeep } from "lodash";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/utils";
import { ACTION_REMOVE, ACTION_UPDATE, ACTION_ADD } from "utilities/constants";
import useBoard from "../../hooks/useBoard";
import {
  apiGetDataBoard,
  createNewColumn,
  updateBoard,
  updateCard,
  updateColumn
} from "actions/APIs";
import Loading from "components/Common/Loading/Loading";
import useAddColumn from "hooks/useAddColumn";
import useUpdateColumn from "hooks/useUpdateColumn";
import useUpdateBoard from "hooks/useUpdateBoard";

function BoardContent({ setActive }) {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  /**Get Data from Board */
  const { isLoading, isError } = useBoard("61cbf9ee1589c242f7f4bb6c", {
    onSuccess: data => {
      setActive(true);
      setBoard(data);
      const columnSorted = mapOrder(data.columns, data.columnOrder, "_id");
      setColumns(columnSorted);
    },
    onError: error => {
      console.log(error);
    }
  });

  /**Event Add New Column */
  const { mutate: addColumn, data: resultsAddColumn } = useAddColumn();

  /**Event Update New Column */
  const {
    mutate: updateColumn,
    data: resultsUpdateColumn,
    status: updateColumnStatus
  } = useUpdateColumn();

  /**Event Update New Column */
  const {
    mutate: updateBoard,
    data: resultsUpdateBoard,
    status: updateColumnBoard
  } = useUpdateBoard();

  /**Get Api thông thường */
  // useEffect(() => {

  //   apiGetDataBoard().then(data => {
  //     setBoard(data);
  //     const columnSorted = mapOrder(data.columns, data.columnOrder, "_id");
  //     setColumns(columnSorted);
  //     // setColumns(data.columns);
  //   });

  // }, []);

  // if (isEmpty(board)) {
  //   return <div className="not-found">Not Found</div>;
  // }

  const onColumnDrop = dropResult => {
    if (dropResult.removedIndex === dropResult.addedIndex) return;
    let newColumns = cloneDeep(columns);
    newColumns = applyDrag(newColumns, dropResult);
    let newBoards = cloneDeep(board);

    newBoards.columnOrder = newColumns.map(c => c._id);
    newBoards.columns = newColumns;

    //Call api update columnOrder in board detail
    setColumns(newColumns);

    // updateBoard(newBoards._id, newBoards).catch(err => {
    //   // setColumns(columns);
    //   // setBoard(board);
    // });
    updateBoard(newBoards._id, newBoards);

    if (updateColumnStatus === "error") {
      setBoard(board);
    }
  };

  const onCardDrop = (columnId, dropResult) => {
    if (dropResult.removedIndex === dropResult.addedIndex) return;
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      /// Add Columns
      // dropResult.removedIndex
      //   ? (isResetColumn = true)
      //   : (isResetColumn = false);
      let newColumns = cloneDeep(columns);
      let currentColumn = newColumns.find(item => item._id === columnId);
      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map(item => item._id);
      // const dataColumnUpdated = { cardOrder: currentColumn.cardOrder };
      setColumns(newColumns);
      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        /**
         * Action: Move card inside its column
         * Call api update cardOrder in current column
         */
        updateColumn(columnId, currentColumn).catch(err => {
          setColumns(columns);
        });
      } else {
        /**
         * Action: Move card between two columns
         * Call api update cardOrder in current column
         * Call api update columnId of card
         */
        updateColumn(columnId, currentColumn).catch(err => {
          setColumns(columns);
        });

        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload);
          currentCard.columnId = columnId;
          updateCard(currentCard._id, currentCard);
          if (updateColumnStatus === "error") {
            setColumns(columns);
          }
        }
      }
      // if (isResetColumn) setColumns(newColumns);
    }
  };

  const onUpdateColumn = (type, columnUpdate) => {
    let newColumns = [...columns];
    let newBoards = { ...board };

    const newColumnsIndex = newColumns.findIndex(
      item => item._id === columnUpdate._id
    );
    if (type === ACTION_ADD) {
      // createNewColumn(columnUpdate).then(column => {
      //   let newColumns = [...columns];
      //   let newBoards = { ...board };
      //   newColumns.push(column);
      //   newBoards.columnOrder = newColumns.map(c => c._id);
      //   newBoards.columns = newColumns;
      //   setColumns(newColumns);
      //   setBoard(newBoards);
      // });

      addColumn(columnUpdate);
      // if (addColumntStatus === "success") {
      //   let newColumns = [...columns];
      //   let newBoards = { ...board };
      //   newColumns.push(columns);
      //   newBoards.columnOrder = newColumns.map(c => c._id);
      //   newBoards.columns = newColumns;
      //   setColumns(newColumns);
      //   setBoard(newBoards);
      // }
      newColumns.push(columnUpdate);
    }
    if (type === ACTION_UPDATE) {
      newColumns.splice(newColumnsIndex, 1, columnUpdate);
    }
    if (type === ACTION_REMOVE) {
      newColumns.splice(newColumnsIndex, 1);
    }
    newBoards.columnOrder = newColumns.map(c => c._id);
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

  if (isLoading) {
    setActive(false);
  }

  if (isError) {
    return <div className="not-found">Not Found</div>;
  }

  return (
    <div className="board-content">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        getChildPayload={index => columns[index]}
        dragHandleSelector=".column-drag-handle"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "column-drop-preview"
        }}>
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
