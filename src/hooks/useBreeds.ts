import { useCallback, useState, useEffect, ChangeEvent } from "react";
import { fetchAllBreeds } from "../api/dog.api";

interface UseBreedsApi {
  breedsList: string[];
  currentBreed: string;
  handleChangeBreed: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const useBreeds = (
  sendToFetchMachine: (arg: { type: "FETCH" }) => void
): UseBreedsApi => {
  const [breedsList, setBreedsList] = useState<string[]>([]);
  const [currentBreed, selectCurrentBreed] = useState("terrier");

  // fetch breeds on mount
  useEffect(() => {
    fetchAllBreeds().then(breeds => setBreedsList(breeds));
  }, []);

  // if breed changes, fetch list
  useEffect(() => {
    sendToFetchMachine({ type: "FETCH" });
  }, [currentBreed, sendToFetchMachine]);

  const handleChangeBreed = useCallback(
    e => {
      selectCurrentBreed(e.target.value);
    },
    [selectCurrentBreed]
  );

  return { breedsList, currentBreed, handleChangeBreed };
};
