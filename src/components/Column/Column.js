import React, { useState, useEffect, useRef } from "react";
import "./Column.scss";
import Card from "components/Card/Card";
import ConfirmModal from "components/Common/ConfirmModal";
// import BlackPanel from "components/Common/BlackPanel";
import {
  MODAL_ACTION_CONFIRM,
  ACTION_REMOVE,
  ACTION_UPDATE,
  ACTION_ADD
} from "utilities/constants";
import { cloneDeep } from "lodash";
// import { mapOrder } from "utilities/sort";
import {
  selectAllText,
  saveContentAfterEnter
} from "utilities/contentEditable";

import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form, Button } from "react-bootstrap";
import { createNewCreateCard } from "actions/getAPIs";
function Column(props) {
  const { column, onCardDrop, handleColumnAction } = props;

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [columnTitle, setColumnTitle] = useState("");

  const [columnData, setColumnData] = useState(column);

  const [cardTitle, setCardTitle] = useState("");

  const [formState, setFormState] = useState(false);

  const [formCardState, setFormCardState] = useState(false);

  const handleFormState = () => setFormState(!formState);
  // const cards = mapOrder(columnData.cards, columnData.cardOrder, "id");
  const cards = columnData.cards || [];

  const messagesEndRef = useRef();

  useEffect(() => {
    setColumnTitle(columnData.title);
  }, [columnData.title]);

  const inputAddCardRef = useRef(null);

  useEffect(() => {
    if (inputAddCardRef && inputAddCardRef.current) {
      inputAddCardRef.current.focus();
      inputAddCardRef.current.select();
      scrollToBottom();
    }
  }, [formState]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCardAction = (action) => {
    if (action === ACTION_ADD) {
      if (!cardTitle) {
        inputAddCardRef.current.focus();
        return;
      }

      const newCardAdded = {
        boardId: columnData.boardId,
        columnId: columnData._id,
        title: cardTitle
      };
      console.log(newCardAdded);
      // handleColumnAction(ACTION_ADD, newColumnAdded);
      const newColumn = { ...columnData };
      newColumn.cards = [];

      createNewCreateCard(newCardAdded);
      newColumn.cards.push(newCardAdded);
      newColumn.cardOrder.push(newCardAdded._id);
      // handleColumnAction(ACTION_UPDATE, newColumn);
      setCardTitle("");
      setFormState(false);
      setColumnData(newColumn);
    }
  };

  const handleAddNewCard = () => {
    if (!cardTitle) {
      inputAddCardRef.current.focus();
      return;
    }
  };
  //   const newCardAdded = {
  //     boardId: columnData.boardId,
  //     columnId: columnData._id,
  //     title: cardTitle,
  //     cover: null
  //   };
  //   // handleColumnAction(ACTION_ADD, newColumnAdded);
  //   let newColumn = cloneDeep(columnData);
  //   newColumn.cards.push(newCardAdded);
  //   newColumn.cardOrder.push(newCardAdded._id);
  //   handleColumnAction(ACTION_UPDATE, newColumn);
  //   setCardTitle("");
  //   setFormState(false);
  // };

  const handleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

  const handleUpdateCard = ({ position, cardId }) => {
    // console.log(position);
    setFormCardState(!formCardState);
  };
  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const columnRemoved = { ...columnData, _destroy: true };
      const dataUpdated = { _destroy: true };
      handleColumnAction(ACTION_REMOVE, columnRemoved, dataUpdated);
    }
    handleShowConfirmModal();
  };

  const handleChangeNameColumn = (e) => {
    setColumnTitle(e.target.value);
  };

  const handleChangeNameBlur = () => {
    const columnUpdated = { ...columnData, title: columnTitle };
    const dataUpdate = { title: columnTitle };
    handleColumnAction(ACTION_UPDATE, columnUpdated, dataUpdate);
  };

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          {/* {column.title} */}

          <Form.Control
            size="sm"
            type="text"
            placeholder="Add Name Column"
            className="editable-content"
            value={columnTitle}
            onChange={handleChangeNameColumn}
            onClick={(e) => selectAllText(e)}
            onBlur={handleChangeNameBlur}
            onKeyDown={(e) => saveContentAfterEnter(e)}
            onMouseDown={(e) => e.preventDefault()}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") handleChangeNameColumn();
            // }}
          />
        </div>
        <div className="input-column-title">
          <Dropdown>
            <Dropdown.Toggle
              split
              variant="success"
              id="dropdown-split-basic"
              size="sm"
              className="btn btn-dropdown"
            />

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleFormState}>
                Add new card
              </Dropdown.Item>
              <Dropdown.Item onClick={handleShowConfirmModal}>
                Remove column
              </Dropdown.Item>
              <Dropdown.Item>Remove all cards in this column</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="card-list">
        <Container
          groupName="col"
          orientation="vertical"
          onDrop={(dropResult) => onCardDrop(columnData._id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragHandleSelector=""
          dragClass="card-ghost"
          dropClass="card-ghost-dropdown"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-preview"
          }}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} handleUpdateCard={handleUpdateCard} />
            </Draggable>
          ))}
        </Container>

        {formState && (
          <div className="add-new-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              rows="3"
              placeholder="Enter a title for this card.."
              className="input-new-card"
              ref={inputAddCardRef}
              value={cardTitle}
              onChange={(e) => setCardTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCardAction(ACTION_ADD);
              }}
            />
            <div ref={messagesEndRef}></div>
          </div>
        )}
      </div>
      <footer>
        {formState && (
          <div className="box-btn">
            <Button
              variant="success"
              className="btn-success-add-cl"
              onClick={() => handleCardAction(ACTION_ADD)}
            >
              Add column
            </Button>
            <span className="btn-cancel-new-cl" onClick={handleFormState}>
              <i className="fa fa-trash icon"></i>
            </span>
          </div>
        )}
        {!formState && (
          <div className="footer-action" onClick={handleFormState}>
            <i className="fa fa-plus icon" />
            Add another card
          </div>
        )}
      </footer>
      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        content={`Are you sure you want remove <strong>${columnData.title}</strong>`}
        title={`Remove Column ${columnData.title}`}
      />
      {/* {formCardState && <BlackPanel position={position} />} */}
    </div>
  );
}

export default Column;
