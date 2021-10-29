import React from "react";
import AppBar from "components/AppBar/AppBar";
import BoardBar from "components/BoardBar/BoarBar";
import BoardContent from "components/BoardContent/BoardContent";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <AppBar></AppBar>
      <BoardBar />
      <BoardContent />
    </div>
  );
}

export default App;
