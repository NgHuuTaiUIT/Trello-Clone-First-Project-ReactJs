import React, { useState, useEffect, useRef } from "react";
import "./Column.scss";
import Card from "components/Card/Card";
import ConfirmModal from "components/Common/ConfirmModal";
import {
  MODAL_ACTION_CONFIRM,
  MODAL_ACTION_CLOSE,
  ACTION_REMOVE,
  ACTION_UPDATE
} from "utilities/constants";
import { cloneDeep } from "lodash";
import { mapOrder } from "utilities/sort";
import {
  selectAllText,
  saveContentAfterEnter
} from "utilities/contentEditable";

import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form, Button } from "react-bootstrap";
import { createNewCard, updateCard, updateColumn } from "actions/APIs";
function Column(props) {
  const { column, onCardDrop, onUpdateColumn, onAddNewCardToColumn } = props;

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [columnTitle, setColumnTitle] = useState("");

  const [cardTitle, setCardTitle] = useState("");

  const [formState, setFormState] = useState(false);
  const handleFormState = () => setFormState(!formState);
  const cards = mapOrder(column.cards, column.cardOrder, "_id") || [];

  const messagesEndRef = useRef();

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

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

  const handleAddNewCard = () => {
    if (!cardTitle) {
      inputAddCardRef.current.focus();
      return;
    }

    const newCardAdded = {
      boardId: column.boardId,
      columnId: column._id,
      title: cardTitle
    };
    // onUpdateColumn(ACTION_ADD, newColumnAdded);
    createNewCard(newCardAdded).then((card) => {
      let newColumn = cloneDeep(column);
      newColumn.cards.push(card);
      newColumn.cardOrder.push(card._id);
      onUpdateColumn(ACTION_UPDATE, newColumn);
      setCardTitle("");
      setFormState(false);
    });
  };

  const onUpdateCard = (action, data, callback) => {
    if (action === ACTION_UPDATE) {
      updateCard(data._id, data).catch((card) => {
        callback();
      });
      const indexCard = column.cards.findIndex((card) => card._id == data._id);
      column.cards.splice(indexCard, 1, data);
    }
    if (action === ACTION_REMOVE) {
      updateCard(data._id, data);
      let newColumn = cloneDeep(column);
      const indexCardOrder = newColumn.cardOrder.findIndex(
        (card) => card == data._id
      );
      newColumn.cardOrder.splice(indexCardOrder, 1);
      const indexCard = column.cards.findIndex((card) => card._id == data._id);
      newColumn.cards.splice(indexCard, 1);
      updateColumn(newColumn._id, newColumn).then((column) => {
        column.cards = newColumn.cards;
        onUpdateColumn(ACTION_UPDATE, column);
      });
    }
  };

  const handleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const columnRemoved = { ...column, _destroy: true };
      updateColumn(columnRemoved._id, columnRemoved).then((column) => {
        column.cards = columnRemoved.cards;
        onUpdateColumn(ACTION_REMOVE, columnRemoved);
      });
    }
    handleShowConfirmModal();
  };

  const handleChangeNameColumn = (e) => {
    setColumnTitle(e.target.value);
  };

  const handleChangeNameBlur = () => {
    const columnUpdated = { ...column, title: columnTitle };
    if (columnTitle !== column.title) {
      updateColumn(columnUpdated._id, columnUpdated).then((column) => {
        column.cards = columnUpdated.cards;
        onUpdateColumn(ACTION_UPDATE, column);
      });
    }
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
              <Dropdown.Item>Add new card</Dropdown.Item>
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
          onDrop={(dropResult) => onCardDrop(column._id, dropResult)}
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
              <Card card={card} onUpdateCard={onUpdateCard} />
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
                if (e.key === "Enter") handleAddNewCard();
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
              onClick={handleAddNewCard}
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
        content={`Are you sure you want remove <strong>${column.title}</strong>`}
        title={`Remove Column ${column.title}`}
      />
    </div>
  );
}
export default Column;
