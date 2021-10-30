import React, { useState, useEffect } from "react";
import "./Column.scss";
import Card from "components/Card/Card";
import ConfirmModal from "components/Common/ConfirmModal";
import {
  MODAL_ACTION_CONFIRM,
  MODAL_ACTION_CLOSE,
  ACTION_REMOVE,
  ACTION_UPDATE,
} from "utilities/constants";

import { mapOrder } from "utilities/sort";
import {
  selectAllText,
  saveContentAfterEnter,
} from "utilities/contentEditable";

import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown, Form } from "react-bootstrap";
function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [columnTitle, setColumnTitle] = useState("");

  // const cards = mapOrder(column.cards, column.cardOrder, "id");
  const cards = column.cards;

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  const handleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const columnRemoved = { ...column, _destroy: true };
      onUpdateColumn(ACTION_REMOVE, columnRemoved);
    }
    handleShowConfirmModal();
  };

  const handleChangeNameColumn = (e) => {
    setColumnTitle(e.target.value);
  };

  const handleChangeNameBlur = () => {
    const columnUpdated = { ...column, title: columnTitle };
    onUpdateColumn(ACTION_UPDATE, columnUpdated);
    console.log(columnTitle);
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
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
          getChildPayload={(index) => cards[index]}
          dragHandleSelector=""
          dragClass="card-ghost"
          dropClass="card-ghost-dropdown"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "card-drop-preview",
          }}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>
      </div>
      <footer>
        <div className="footer-action">
          <i className="fa fa-plus icon" />
          Add another card
        </div>
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
