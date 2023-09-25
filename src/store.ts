import {
  configureStore,
  createSelector,
  getDefaultMiddleware
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import localforage from "localforage";

import {
  reducer as notesReducer,
  actions as notesActions,
  NotesDict,
  ContainerNotes
} from "./slices/notes";

const reducerPersistConfig = {
  storage: localforage
};

export const store = configureStore({
  reducer: {
    notes: persistReducer(
      {
        key: "notes",
        ...reducerPersistConfig
      },
      notesReducer
    )
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
    }
  })
});

export const persistor = persistStore(store);

export const actions = {
  notes: notesActions
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const getAllNotesSelector = (state: RootState) => state.notes.items;

const getNotesForContainerSelector = createSelector(
  [
    getAllNotesSelector,
    (state: RootState, containerName: string) => containerName
  ],
  (items: ContainerNotes, containerName: string) => items[containerName]
);

export const selectors = {
  notes: {
    getAllNotes: getAllNotesSelector,
    getContainerNames: createSelector(
      [getAllNotesSelector],
      (containers: ContainerNotes) => Object.keys(containers)
    ),
    getNotes: getNotesForContainerSelector,
    getNote: createSelector(
      [
        getNotesForContainerSelector,
        (state: RootState, containerName: string, id: string) => id
      ],
      (notes: NotesDict, id: string) => notes?.[id]
    )
  }
};
