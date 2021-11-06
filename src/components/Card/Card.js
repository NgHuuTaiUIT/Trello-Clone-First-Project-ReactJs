import React, { useState } from "react";
import "./Card.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Dropdown, Form, Button, CloseButton } from "react-bootstrap";
import { updateCard } from "actions/APIs";
import { cloneDeep } from "lodash";
import {
  saveContentAfterEnter,
  selectAllText
} from "utilities/contentEditable";
import { ACTION_REMOVE, ACTION_UPDATE } from "utilities/constants";

function Card(props) {
  const { card, onUpdateCard } = props;
  const [copied, setCopy] = useState(false);
  const [cardTitle, setCardTitle] = useState(card.title);

  const handleChangeNameBlur = () => {
    const cardUpdated = cloneDeep(card);
    cardUpdated.title = cardTitle;
    if (cardTitle !== card.title) {
      setCardTitle(cardTitle);

      onUpdateCard(ACTION_UPDATE, cardUpdated, () => {
        setCardTitle(card.title);
      });
    }
  };

  const handleChangeNameCard = (e) => {
    setCardTitle(e.target.value);
  };

  const handleRemoveCard = (e) => {
    const cardRemoved = cloneDeep(card);
    cardRemoved._destroy = true;
    onUpdateCard(ACTION_REMOVE, cardRemoved, () => {
      setCardTitle(card.title);
    });
  };

  return (
    <CopyToClipboard text={cardTitle} onCopy={() => setCopy(true)}>
      <div className="card-item">
        {card.cover && (
          <img src={card.cover} onMouseDown={(e) => e.preventDefault()} />
        )}
        <div className="card-content">
          {/* {cardTitle} */}

          {/* <i className="fas fa-pen" /> */}

          <Form.Control
            as="textarea"
            rows={3}
            size="sm"
            type="text"
            placeholder="Add Name card"
            className="editable-content"
            value={cardTitle}
            onChange={handleChangeNameCard}
            onClick={(e) => e.preventDefault()}
            onDoubleClick={(e) => selectAllText(e)}
            onBlur={handleChangeNameBlur}
            onKeyDown={(e) => saveContentAfterEnter(e)}
            onMouseDown={(e) => e.preventDefault()}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter") handleChangeNamecard();
            // }}
          />
        </div>
        <CloseButton className="start-right" onClick={handleRemoveCard} />
      </div>
    </CopyToClipboard>
  );
}
export default Card;
