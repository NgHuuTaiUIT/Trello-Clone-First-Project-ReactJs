/* eslint-disable react/react-in-jsx-scope */
const { default: AppBar } = require("components/AppBar/AppBar");
const { default: BoardBoard } = require("components/BoardBar/BoarBar");
const {
  default: BoardContent
} = require("components/BoardContent/BoardContent");
const { default: Loading } = require("components/Common/Loading/Loading");
const { useState } = require("react");

const MainPage = () => {
  const [active, setActive] = useState(false);

  return (
    <>
      <Loading active={active} />
      <AppBar />
      <BoardBoard />
      <BoardContent setActive={setActive} />
    </>
  );
};

export default MainPage;