//import { actionTypes } from "../../../../helpers/actionTypes";
//import { games } from "../../../../helpers/gameBlocks";
import React, { useEffect, useReducer, useState, useContext } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { useNavigate } from "react-router-dom";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../../styles/components/_createpost.scss";
import { PrePost } from "../PrePost";
import { useParams } from "react-router-dom";
import { Context } from "../../../main/App";
import jwt from "jwt-decode";

interface ITokenData {
	name: string;
	id: number;
}
export function CreatePostPage() {
	const tokenDecoded: ITokenData = jwt(localStorage.getItem("jwt") as string);

	const { gameId, postId } = useParams();
	const navigate = useNavigate();
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
	const [previewState, setPreviewState] = useState("");
	// const [title, setTitle] = useState(""); agregar esta functionality abajo
	// const [state, setState] = useState([]); agregar esta functionality abajo
	const { state, dispatch } = useContext(Context);
	const { user } = state;
	const [postData, setPostData] = useState({
		title: "",
		body: "",
		created_by: 0,
		valoration: 0,
		game_id: "",
		created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
		created_by_name: tokenDecoded.name,
		readyToPublish: false
	});
	const [games, setGames] = useState([]);
	const { title, body, created_by, valoration, game_id, created_at, created_by_name } = postData;

	useEffect(() => {
		const fetchData = async () => {
			await fetch("http://localhost:8080/api/games")
				.then((res: any) => res.json())
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
					created_by_name
				}),
			});
			navigate(`/games/${postData.game_id}`);
		}
		if (postData.created_by && postData.game_id && postData.body && postData.title && postData.readyToPublish) {
			publishPost();
		} else {
			console.log("si entro acá no se postea una verga")
		}
	}, [postData]);

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

	async function handlePublish() {
		console.log(tokenDecoded);
		setPostData({
			...postData,
			created_by: tokenDecoded.id,
			body: updateTextDescription(editorState),
			created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
			readyToPublish: true
		});
	}
	/* async function handlePublish() {
		const tokenDecoded: ITokenData = jwt(localStorage.getItem("jwt") as string);
		if (postData.title.length > 0) {

				if (postData.body.length > 9) {
						console.log(tokenDecoded);
						setPostData({
								...postData,
								created_by: tokenDecoded.id,
								body: updateTextDescription(editorState),
								created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
						});
				} else {
						alert("Falta llenar cuerpo del post");
				}
		} else {
				alert("Falta poner titulo al post");
		}
	} */

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
								readyToPublish: false
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
								readyToPublish: false
							});
						}}
					>
						<option disabled value={0}>
							Selecciona un juego
						</option>
						{games.map((elemento: any) => (
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
			<button>finish set state test</button>
		</>
	);
}
