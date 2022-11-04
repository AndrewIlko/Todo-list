import { useState } from "react";
import ToDoList from "./components/ToDoList";
import Wrapper from "./components/Wrapper";
import BgColorPalette from "./components/BgColorPalette";
import "./styles/dist/style.css";
function App() {
  const [bgColor, setBgColor] = useState("rgb(251, 251, 250)");
  return (
    <>
      <Wrapper bgColor={bgColor}>
        <BgColorPalette setBgColor={setBgColor} bgColor={bgColor} />
        <ToDoList />
      </Wrapper>
    </>
  );
}

export default App;
