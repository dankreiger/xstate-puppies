export interface FetchContext {
  results: any[];
  message: string;
}

export interface FetchStates {
  states: {
    idle: {};
    pending: {};
    successful: {};
    failed: {};
  };
}

export type FetchMachineEvents =
  | { type: "FETCH" }
  | { type: "RESOLVE"; results: any[] }
  | { type: "REJECT"; message: string };
