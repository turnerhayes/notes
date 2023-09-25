import React from "react";
import { useLoaderData } from "react-router-dom";

import { LinkList } from "./LinkList";

import "./styles.css";

export default function App() {
  const { containers } = useLoaderData() as { containers: string[] };
  return (
    <div className="App">
      <header>
        <h1>Notes</h1>
      </header>
      {containers.length > 0 ? (
        <LinkList
          items={containers.reduce((items, containerName) => {
            items[containerName] = `/notes/${containerName}`;
            return items;
          }, {} as { [text: string]: string })}
        />
      ) : (
        <div>No Notes</div>
      )}
    </div>
  );
}
