import ColorPalette from "../styles/ColorPalette.module.css";

const BgColorPaletteItem = ({ color, bgColor, setBgColor, setPopUpStatus }) => {
  const handleClick = () => {
    setBgColor(color);
    setPopUpStatus(false);
  };
  return (
    <>
      <li
        className={ColorPalette.colorListItem}
        style={{
          backgroundColor: color,
          display: color == bgColor ? "none" : "block",
        }}
        onClick={handleClick}
      />
    </>
  );
};

export default BgColorPaletteItem;
