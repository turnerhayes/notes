import { useCallback } from "react";
import { useParams } from "react-router-dom";
import MarkdownEditor from "@uiw/react-markdown-editor";

import styles from "./NoteDetail.module.css";
import { actions, selectors } from "./store";
import { useAppDispatch, useAppSelector } from "./hooks";

export const NoteDetail = () => {
  const { containerName, id } = useParams();
  const dispatch = useAppDispatch();
  const note = useAppSelector((state) =>
    selectors.notes.getNote(state, containerName!, id!)
  );
  const changeHandler = useCallback(
    (value: string) => {
      dispatch(
        actions.notes.setNote({
          containerName: containerName!,
          id: id!,
          note: value
        })
      );
    },
    [containerName, id, dispatch]
  );

  return (
    <div className={styles.root}>
      <MarkdownEditor
        className={styles.editorItem}
        value={note}
        onChange={changeHandler}
      />
      <MarkdownEditor.Markdown className={styles.editorItem} source={note} />
    </div>
  );
};
