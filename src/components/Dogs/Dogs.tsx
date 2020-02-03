import React from "react";
import { useDogBreeds } from "../../hooks/useDogBreeds";
import { fetchDogs } from "../../api/dog.api";
import { useMachine } from "@xstate/react";
import { fetchMachine } from "../../machines/fetch";
import Controls from "../Controls/Controls";

export default function Dogs(): JSX.Element {
  const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
    services: {
      fetchData: async () => fetchDogs(currentDogBreed)
    }
  });

  const { dogBreedsList, currentDogBreed, handleChangeDogBreed } = useDogBreeds(
    sendToFetchMachine
  );

  const { results } = fetchState.context;

  return (
    <div>
      <Controls
        sendToFetchMachine={sendToFetchMachine}
        breedsList={dogBreedsList}
        handleChangeBreed={handleChangeDogBreed}
        emoji="🐶"
        arialLabel="dog"
      />

      <div className="grid">
        {fetchState.matches("pending") && (
          <div className="content-wrapper">
            <p>loading</p>
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
