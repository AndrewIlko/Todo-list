import BgColorPaletteItem from "./BgColorPaletteItem";
import ColorPalette from "../styles/ColorPalette.module.css";
import { useState } from "react";

const BgColorPalette = ({ setBgColor, bgColor }) => {
  const [popUpStatus, setPopUpStatus] = useState(false);
  const listOfColors = [
    { id: 1, color: "#5E96C3" },
    { id: 2, color: "#D7C3B5" },
    { id: 3, color: "#ECD7DF" },
    { id: 4, color: "#B4E0DE" },
    { id: 5, color: "rgb(0,0,0,0.2)" },
    { id: 6, color: "rgb(251, 251, 250)" },
  ];
  let popUpHeight =
    (listOfColors.length - 1) * 35 + (listOfColors.length - 1) * 5;

  const winWatcher = (e) => {
    console.log(e.target);
  };
  return (
    <>
      <div className={ColorPalette.wrapper}>
        <button
          className={ColorPalette.selectedColor}
          style={{ backgroundColor: bgColor }}
          onClick={() => {
            setPopUpStatus(!popUpStatus);
          }}
        />
        <ul
          className={ColorPalette.colorList}
          style={
            popUpStatus
              ? { height: popUpHeight, transition: "all 0.15s ease" }
              : { height: 0 }
          }
        >
          {listOfColors.map((item) => {
            return (
              <>
                <BgColorPaletteItem
                  key={item.id}
                  color={item.color}
                  bgColor={bgColor}
                  setBgColor={setBgColor}
                  setPopUpStatus={setPopUpStatus}
                />
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default BgColorPalette;
