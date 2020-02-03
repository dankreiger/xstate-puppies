import { useCallback, useState, useEffect, ChangeEvent } from "react";
import { fetchAllCatBreeds } from "../api/cats.api";

interface UseCatBreedsApi {
  catBreedsList: string[];
  currentCatBreed: string;
  handleChangeCatBreed: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const useCatBreeds = (
  sendToCatFetchMachine: (arg: { type: "FETCH" }) => void
): UseCatBreedsApi => {
  const [catBreedsList, setdogBreedsList] = useState<string[]>([]);
  const [currentCatBreed, selectCurrentDogBreed] = useState("terrier");

  // fetch breeds on mount
  useEffect(() => {
    fetchAllCatBreeds().then(breeds => setdogBreedsList(breeds));
  }, []);

  // if breed changes, fetch list
  useEffect(() => {
    sendToCatFetchMachine({ type: "FETCH" });
  }, [currentCatBreed, sendToCatFetchMachine]);

  const handleChangeCatBreed = useCallback(
    e => {
      selectCurrentDogBreed(e.target.value);
    },
    [selectCurrentDogBreed]
  );

  return { catBreedsList, currentCatBreed, handleChangeCatBreed };
};
