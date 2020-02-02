import React from "react";
import "./App.css";
import { fetchMachine } from "../machines/fetch";
import { useMachine } from "@xstate/react";
import { fetchDogs } from "../api/dog.api";
import { useBreeds } from "../hooks/useBreeds";

const App = () => {
  const [fetchState, sendToFetchMachine] = useMachine(fetchMachine, {
    services: {
      fetchData: async () => fetchDogs(currentBreed)
    }
  });

  const { breedsList, currentBreed, handleChangeBreed } = useBreeds(
    sendToFetchMachine
  );

  return (
    <div className="App">
      <div className="controls">
        <button onClick={() => sendToFetchMachine({ type: "FETCH" })}>
          <span role="img" aria-label="dog">
            🐶
          </span>
        </button>
        <select onChange={handleChangeBreed}>
          {breedsList.map(breed => (
            <option value={breed}>{breed}</option>
          ))}
        </select>
      </div>

      {fetchState.matches("pending") && <p>Loading</p>}
      {fetchState.matches("successful") && (
        <div className="grid">
          {fetchState.context.results &&
            fetchState.context.results.map(result => (
              <div className="img-wrapper">
                <img src={result} alt={result} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
