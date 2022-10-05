//import { actionTypes } from "../../../../helpers/actionTypes";
//import { games } from "../../../../helpers/gameBlocks";
import React, { useEffect, useReducer, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../../styles/components/_createpost.scss";
import { PrePost } from "../PrePost";

export function CreatePostPage() {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
	const [previewState, setPreviewState] = useState("");
	const [title, setTitle] = useState("");

	const [state, setState] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			await fetch("http://localhost:8080/api/games")
				.then((res: any) => res.json())
				.then(data => setState(data));
		};
		fetchData().catch(console.error);
	}, []);

	const updateTextDescription = (state: any) => {
		setEditorState(state);
		const data = convertToRaw(editorState.getCurrentContent());
		//console.log(data);
		return draftToHtml(data);
	};

	const previsualizar = () => {
		const data = updateTextDescription(editorState);
		//console.log(data);
		setPreviewState(data);
	};

	return (
		<>
			<div className="title-create">
				<div className="title-edit">
					<p>Crear Post</p>
				</div>
				<div className="title-post">
					<input
						placeholder="Titulo"
						type="text"
						onChange={event => {
							setTitle(event.target.value);
						}}
					/>
					<select name="juegos">
						{state.map((elemento: any) => (
							<option key={elemento.id} value={elemento.id}>
								{elemento.name}
							</option>
						))}
					</select>
					<button className="btn-preview" onClick={previsualizar}>
						Previzualizar
					</button>
					<button className="btn-post">Publicar</button>
				</div>
			</div>
			<div className="text-create">
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
						stripPastedStyles={true}
					/>
				</div>
				<div className="text-preview">
					<PrePost texto={previewState} />
				</div>
			</div>
		</>
	);
}
