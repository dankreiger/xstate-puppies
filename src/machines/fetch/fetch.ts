import { Machine, assign } from "xstate";
import { FetchContext, FetchStates, FetchMachineEvents } from "./fetch.types";

export const fetchMachine = Machine<
  FetchContext,
  FetchStates,
  FetchMachineEvents
>(
  {
    id: "fetch",
    initial: "idle",
    context: {
      results: [],
      message: ""
    },
    states: {
      idle: {
        on: {
          FETCH: "pending"
        }
      },
      pending: {
        invoke: {
          src: "fetchData",
          onDone: { target: "successful", actions: ["setResults"] },
          onError: { target: "failed", actions: ["setMessage"] }
        }
      },
      failed: {
        on: {
          FETCH: "pending"
        }
      },
      successful: {
        on: {
          FETCH: "pending"
        }
      }
    }
  },
  {
    actions: {
      setResults: assign((ctx, event: any) => ({
        results: event.data
      })),
      setMessage: assign((ctx, event: any) => ({
        message: event.message
      }))
    }
  }
);
