import React from "react";
import { useMachine } from "@xstate/react";
import { fetchMachine } from "../../machines/fetch";
import { fetchCats } from "../../api/cats.api";
import { useCatBreeds } from "../../hooks/useCatBreeds";
import Controls from "../Controls/Controls";

export default function Cats(): JSX.Element {
  const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
    services: {
      fetchData: async () => fetchCats(currentCatBreed)
    }
  });

  const { catBreedsList, currentCatBreed, handleChangeCatBreed } = useCatBreeds(
    sendToFetchMachine
  );

  const { results } = fetchState.context;
  return (
    <div>
      <Controls
        sendToFetchMachine={sendToFetchMachine}
        breedsList={catBreedsList}
        handleChangeBreed={handleChangeCatBreed}
        emoji="🐈"
        arialLabel="cat"
      />
      <div className="grid">
        {fetchState.matches("pending") && (
          <div className="content-wrapper">
            <p>Loading</p>
          </div>
        )}
        {fetchState.matches("successful") &&
          results &&
          results.map(result => (
            <div className="content-wrapper">
              <img src={result} alt={result} />
            </div>
          ))}
      </div>
    </div>
  );
}
