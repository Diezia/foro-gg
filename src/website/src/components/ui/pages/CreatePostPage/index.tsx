//import { actionTypes } from "../../../../helpers/actionTypes";
//import { games } from "../../../../helpers/gameBlocks";
import React, { useEffect, useReducer, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../../styles/components/_createpost.scss";

export function CreatePostPage() {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

	const updateTextDescription = (state: any) => {
		setEditorState(state);
		const data = convertToRaw(editorState.getCurrentContent());
		console.log(data);
		console.log(draftToHtml(data));
	};

	return (
		<>
			<div className="title-edit">
				<p> Edit page</p>
			</div>
			<div className="title-post">
				<input type="text" />
			</div>
			<div className="text-edit">
				<Editor
					editorState={editorState}
					toolbarClassName="toolbarClassName"
					toolbar={{
						options: ["inline", "history"],
						inline: {
							options: ["bold", "italic", "underline", "strikethrough"],
						},
					}}
					wrapperClassName="wrapperClassName"
					editorClassName="editorClassName"
					onEditorStateChange={updateTextDescription}
				/>
			</div>
		</>
	);
}

/* toolbarClassName="toolbarClassName"
			wrapperClassName="wrapperClassName"
			editorClassName="editorClassName"
			*/
/* 	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

	const updateTextDescription = (state: any) => {
		setEditorState(state);
		const data = convertToRaw(editorState.getCurrentContent());
		console.log(data);
		console.log(convertFromRaw(data));
	}; */

{
	/* <div className="edit">
		<Editor
			editorState={editorState}
			onEditorStateChange={updateTextDescription}
			
		/>
		<input type="submit" value="Submit"/>
		</div> */
}
