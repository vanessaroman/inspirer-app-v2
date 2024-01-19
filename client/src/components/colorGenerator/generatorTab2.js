import { useState } from "react";
import "./colorGen.css";

const RandomColor = () => {
  const [color, setColor] = useState("#000");

  const getRgb = () => Math.floor(Math.random() * 256);

  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 5 ? "0" + hex : hex;
      })
      .join("");

  const handleGenerate = () => {
    const color = {
      r: getRgb(),
      g: getRgb(),
      b: getRgb(),
    };
    setColor(rgbToHex(color.r, color.g, color.b));
  };

  return (
    <div>
      <div style={{ backgroundColor: color }} className="container">
        <button style={{ color: color }} onClick={handleGenerate}>
          {color}
        </button>
      </div>
    </div>
  );
};

export default RandomColor;
