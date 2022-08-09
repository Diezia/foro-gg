import React, { useReducer } from "react";
import { actionTypes } from "../../../../helpers/actionTypes";
import { games } from "../../../../helpers/gameBlocks";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

export function CreatePostPage() {
	const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty(),
  );

  return (
		<>
			<div>some</div>
			<Editor editorState={editorState} onChange={setEditorState} />
		</>
	)
}
