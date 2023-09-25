import { useCallback } from "react";
import { useLoaderData } from "react-router-dom";
import { FileUpload } from "@mui/icons-material";
import { IconButton } from "@mui/material";

import { LinkList } from "./LinkList";
import { useAppDispatch, useAppSelector } from "./hooks";
import { AppDispatch, actions, selectors } from "./store";
import styles from "./NoteList.module.css";

const uploadNoteFiles = (
  files: FileList,
  containerName: string,
  dispatch: AppDispatch
) => {
  for (const file of Array.from(files)) {
    const reader = new FileReader();
    reader.onload = () => {
      const noteText = reader.result as string;
      const title = Intl.DateTimeFormat(navigator.language).format(
        new Date(file.lastModified)
      );
      dispatch(
        actions.notes.setNote({
          containerName,
          id: title,
          note: noteText
        })
      );
    };
    reader.readAsText(file);
  }
};

export const NoteList = () => {
  const { containerName } = useLoaderData() as { containerName: string };
  const notes = useAppSelector((state) =>
    selectors.notes.getNotes(state, containerName)
  );
  const dispatch = useAppDispatch();

  const handleUploadClick = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (event: Event) => {
      const files = (event.currentTarget as HTMLInputElement).files;
      if (!files) {
        return;
      }
      uploadNoteFiles(files, containerName, dispatch);
    };
    input.click();
  }, [containerName, dispatch]);

  return (
    <div>
      <header className={styles.header}>
        <h1>{containerName}</h1>
        <IconButton onClick={handleUploadClick} aria-label="Upload notes file">
          <FileUpload />
        </IconButton>
      </header>
      <LinkList
        items={Object.keys(notes).reduce((items, id) => {
          items[id] = `/notes/${encodeURIComponent(
            containerName
          )}/${encodeURIComponent(id)}`;
          return items;
        }, {} as { [text: string]: string })}
      />
    </div>
  );
};
