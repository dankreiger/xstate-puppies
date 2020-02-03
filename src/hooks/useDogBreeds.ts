import { useCallback, useState, useEffect, ChangeEvent } from "react";
import { fetchAllDogBreeds } from "../api/dog.api";

interface UseDogBreedsApi {
  dogBreedsList: string[];
  currentDogBreed: string;
  handleChangeDogBreed: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const useDogBreeds = (
  sendToFetchMachine: (arg: { type: "FETCH" }) => void
): UseDogBreedsApi => {
  const [dogBreedsList, setdogBreedsList] = useState<string[]>([]);
  const [currentDogBreed, selectCurrentDogBreed] = useState("terrier");

  // fetch breeds on mount
  useEffect(() => {
    fetchAllDogBreeds().then(breeds => setdogBreedsList(breeds));
  }, []);

  // if breed changes, fetch list
  useEffect(() => {
    sendToFetchMachine({ type: "FETCH" });
  }, [currentDogBreed, sendToFetchMachine]);

  const handleChangeDogBreed = useCallback(
    e => {
      selectCurrentDogBreed(e.target.value);
    },
    [selectCurrentDogBreed]
  );

  return { dogBreedsList, currentDogBreed, handleChangeDogBreed };
};
