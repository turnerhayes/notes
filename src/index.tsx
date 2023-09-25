import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { NoteList } from "./NoteList";
import { NoteDetail } from "./NoteDetail";
import { Layout } from "./Layout";
import { store, selectors, persistor } from "./store";
import { actions as notesActions } from "./slices/notes";

async function initNotes() {
  const containerName = "MATH-21";
  const id = "9/18/2023";
  const noteText = "===test note===";

  store.dispatch(
    notesActions.setNote({
      containerName,
      id,
      note: noteText
    })
  );
}

initNotes();

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        loader: async () => {
          const containers = selectors.notes.getContainerNames(
            store.getState()
          );
          return {
            containers
          };
        },
        element: <App />
      },
      {
        path: "notes",
        children: [
          {
            path: ":containerName",
            handle: {
              crumbText: (data: { containerName: string }) => data.containerName
            },
            children: [
              {
                index: true,
                loader: async ({ params }) => {
                  const state = store.getState();
                  const notes = selectors.notes.getNotes(
                    state,
                    params.containerName!
                  );
                  return { notes, containerName: params.containerName! };
                },
                element: <NoteList />
              },
              {
                path: ":id",
                element: <NoteDetail />,
                handle: {
                  crumbText: (data: { id: string }) => data.id
                }
              }
            ]
          }
        ]
      }
    ]
  }
]);

root.render(
  <React.StrictMode>
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PersistGate>
  </React.StrictMode>
);
