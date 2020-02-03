import React from "react";
import { ControlsProps } from "./Controls.interface";

export default function Controls({
  sendToFetchMachine,
  handleChangeBreed,
  breedsList,
  emoji,
  arialLabel
}: ControlsProps) {
  return (
    <div className="controls">
      <button onClick={() => sendToFetchMachine({ type: "FETCH" })}>
        <span role="img" aria-label={arialLabel}>
          {emoji}
        </span>
      </button>
      <select onChange={handleChangeBreed}>
        {breedsList.map(breed => (
          <option value={breed}>{breed}</option>
        ))}
      </select>
    </div>
  );
}
