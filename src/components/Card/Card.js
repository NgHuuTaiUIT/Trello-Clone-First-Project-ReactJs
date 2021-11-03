import React, { useState } from "react";
import "./Card.scss";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { DropdownButton, Dropdown, Form } from "react-bootstrap";
function Card(props) {
  const { card, handleShowConfirmModal, handleUpdateCard } = props;

  const [copied, setCopy] = useState(false);
  const handleOnClickUpdateCard = (e) => {
    // console.log(e);
    // if (e) {
    //   const left = e.pageX;
    //   const top = e.pageY;
    //   console.log(top, left);
    //   handleUpdateCard({ top, left }, card.id);
    // }
    // handleUpdateCard();
  };
  return (
    <>
      <CopyToClipboard text={card.title} onCopy={() => setCopy(true)}>
        <div className="card-item">
          {card.cover && (
            <img src={card.cover} onMouseDown={(e) => e.preventDefault()} />
          )}
          <div className="card-content">
            {card.title}

            {/* <DropdownButton
            // as={ButtonGroup}
            align={{ lg: "end" }}
            title=""
            id="dropdown-menu-align-responsive-1"
          >
            <Dropdown.Item eventKey="1">Action 1</Dropdown.Item>
            <Dropdown.Item eventKey="2">Action 2</Dropdown.Item>
          </DropdownButton> */}
            <i
              className="fas fa-pen"
              onClick={(e) => handleOnClickUpdateCard(e)}
            />
          </div>
        </div>
      </CopyToClipboard>
    </>
  );
}
export default Card;
