import React from "react";
import "./Loading.scss";

export default function Loading({ active = false }) {
  return (
    <div className="loading__bg" style={active ? { display: "none" } : {}}>
      <div className="loader"></div>
    </div>
  );
}
