import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SetNoteAction {
  containerName: string;
  id: string;
  note: string;
}

export type NotesDict = { [id: string]: string };

export type ContainerNotes = { [containerName: string]: NotesDict };

export interface NotesState {
  items: ContainerNotes;
}

const initialState: NotesState = {
  items: {}
};

const slice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNote(
      state: NotesState,
      { payload: { containerName, id, note } }: PayloadAction<SetNoteAction>
    ) {
      let notes = state.items[containerName];
      if (!notes) {
        notes = {};
        state.items[containerName] = notes;
      }
      notes[id] = note;
    }
  }
});

export const { reducer } = slice;
export const { actions } = slice;
