import React, { useState } from "react";
import "./Card.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
function Card(props) {
  const { card } = props;
  const [copied, setCopy] = useState(false);
  return (
    <CopyToClipboard text={card.title} onCopy={() => setCopy(true)}>
      <div className="card-item">
        {card.cover && (
          <img src={card.cover} onMouseDown={(e) => e.preventDefault()} />
        )}
        <div className="card-content">
          {card.title}
          <i className="fas fa-pen" />
        </div>
      </div>
    </CopyToClipboard>
  );
}
export default Card;
