import React, { useEffect, useState, useContext } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { useNavigate } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../../styles/components/_createpost.scss";
import { PrePost } from "../PrePost";
import jwt from "jwt-decode";

interface ITokenData {
	name: string;
	id: number;
}
export function CreatePostPage() {
	const tokenDecoded: ITokenData = jwt(localStorage.getItem("jwt") as string);

	const navigate = useNavigate();
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
	const [previewState, setPreviewState] = useState("");

	const [postData, setPostData] = useState({
		title: "",
		body: "",
		created_by: 0,
		valoration: 0,
		game_id: "",
		created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
		created_by_name: tokenDecoded.name,
		readyToPublish: false,
	});
	const [games, setGames] = useState([]);
	const { title, body, created_by, valoration, game_id, created_at, created_by_name } = postData;

	useEffect(() => {
		const fetchData = async () => {
			await fetch("http://localhost:8080/api/games")
				.then((res: Response) => res.json())
				.then(data => setGames(data));
		};
		fetchData().catch(console.error);
	}, []);
	useEffect(() => {
		async function publishPost() {
			await fetch(`http://localhost:8080/api/games/${postData.game_id}/posts/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				mode: "cors",
				body: JSON.stringify({
					title,
					body,
					created_by,
					valoration,
					game_id,
					created_at,
					created_by_name,
				}),
			});
			navigate(`/games/${postData.game_id}`);
		}
		if (postData.created_by && postData.game_id && postData.body && postData.title && postData.readyToPublish) {
			publishPost();
		}
	}, [postData]);

	const updateTextDescription = (state: EditorState) => {
		setEditorState(state);
		const data = convertToRaw(editorState.getCurrentContent());
		return draftToHtml(data);
	};

	const previsualizar = () => {
		const data = updateTextDescription(editorState);
		setPreviewState(data);
	};

	async function handlePublish() {
		setPostData({
			...postData,
			created_by: tokenDecoded.id,
			body: updateTextDescription(editorState),
			created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
			readyToPublish: true,
		});
	}
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
							setPostData({
								...postData,
								title: event.target.value,
								readyToPublish: false,
							});
						}}
					/>

					<select
						defaultValue="0"
						name="juegos"
						id="juegos"
						onChange={e => {
							setPostData({
								...postData,
								game_id: e.target.value,
								readyToPublish: false,
							});
						}}
					>
						<option disabled value={0}>
							Selecciona un juego
						</option>
						{games.map((elemento: Storage) => (
							<option key={elemento.id} value={elemento.id}>
								{elemento.name}
							</option>
						))}
					</select>

					<button className="btn-preview" onClick={previsualizar}>
						Previzualizar
					</button>
					<button className="btn-post" onClick={handlePublish}>
						Publicar
					</button>
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
