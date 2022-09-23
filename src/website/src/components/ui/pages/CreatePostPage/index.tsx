import React, { useEffect, useReducer, useState } from "react";
import { actionTypes } from "../../../../helpers/actionTypes";
import { games } from "../../../../helpers/gameBlocks";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../../../styles/components/_createpost.scss'

export function CreatePostPage() {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

	const updateTextDescription = (state: any) => {
		setEditorState(state);
		const data = convertToRaw(editorState.getCurrentContent());
		console.log(data);
		console.log(convertFromRaw(data));
	};

	return (
		<div className="edit">
		<Editor
			editorState={editorState}
			onEditorStateChange={updateTextDescription}
			toolbar={{
				options: ["inline", "link", "history"],
				inline: {
					options: ["bold", "italic", "underline", "strikethrough"],
				},
			}}
		/>
		<input type="submit" value="Submit"/>
		</div>
	);
}

/* toolbarClassName="toolbarClassName"
			wrapperClassName="wrapperClassName"
			editorClassName="editorClassName"
			*/
