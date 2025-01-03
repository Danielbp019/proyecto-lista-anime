import React from "react";

const TemasDisponibles = ({ handleThemeChange }) => {
  const themes = [
    "light",
    "dark",
    "acid",
    "aqua",
    "autumn",
    "black",
    "bumblebee",
    "business",
    "coffee",
    "corporate",
    "cupcake",
    "cmyk",
    "cyberpunk",
    "dracula",
    "emerald",
    "fantasy",
    "forest",
    "garden",
    "halloween",
    "lemonade",
    "luxury",
    "lofi",
    "night",
    "pastel",
    "retro",
    "synthwave",
    "valentine",
    "winter",
    "wireframe",
  ];

  return (
    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      {themes.map((theme) => (
        <li key={theme}>
          <button onClick={() => handleThemeChange(theme)}>{theme}</button>
        </li>
      ))}
    </ul>
  );
};

export default TemasDisponibles;
