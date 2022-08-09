import React, { useEffect, useReducer, useState } from "react";
import { actionTypes } from "../../../../helpers/actionTypes";
import { games } from "../../../../helpers/gameBlocks";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export function CreatePostPage() {
	const [editorState, setEditorState] = useState(
		() => EditorState.createEmpty()
	);
	// function somefunc() {

		const updateTextDescription = async (state: any) => {
			await setEditorState(state);
			const data = convertToRaw(editorState.getCurrentContent());
		};
	// }
/* 	useEffect(() => {
		somefunc()
	}, []) */
	

// console.log(editorState)
  return (
		<Editor
			editorState={editorState}
			toolbarClassName="toolbarClassName"
			wrapperClassName="wrapperClassName"
			editorClassName="editorClassName"
			onEditorStateChange={updateTextDescription}
		/>
	)
}
