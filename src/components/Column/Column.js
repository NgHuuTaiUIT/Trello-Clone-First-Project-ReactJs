import React from "react";
import "./Column.scss";
import Card from "components/Card/Card";
import { mapOrder } from "utilities/sort";
import { Container, Draggable } from "react-smooth-dnd";
function Column(props) {
  const { column } = props;

  // const cards = mapOrder(column.cards, column.cardOrder, "id");
  const cards = column.cards;

  const onCardDrop = (dropResult) => {};
  return (
    <div className="column">
      <header className="column-drag-handle">{column.title}</header>
      <div className="card-list">
        <Container
          groupName="col"
          orientation="vertical"
          onDrop={onCardDrop}
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
      <footer>Add another card</footer>
    </div>
  );
}
export default Column;
