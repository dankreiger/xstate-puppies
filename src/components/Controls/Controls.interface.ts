import { ChangeEvent } from "react";

export interface ControlsProps {
  sendToFetchMachine: (action: { type: "FETCH" }) => void;
  handleChangeBreed: (e: ChangeEvent<HTMLSelectElement>) => void;
  breedsList: string[];
  emoji: string;
  arialLabel: string;
}
