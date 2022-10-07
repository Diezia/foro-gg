import React, { useEffect, useState } from "react";
import { CreatePostPage } from "../CreatePostPage";
import { PrePost } from "../PrePost";
import "../../../../styles/components/_postpage.scss";
import { useNavigate, useParams } from "react-router-dom";
import CommentComponent from "../../ShowComments/ShowComments";
import "../../../../styles/components/_postpage.scss";
import { useForm } from "../../../../hooks/useForm";
import jwtDecode from "jwt-decode";
import e from "express";

interface ITokenData {
	name: string;
	id: number;
}

export function PostPage() {
	// TENGO QUE CREAR UN ESTADO COMPLETO DEL POST CON SUS COMENTARIOS Y CREAR UNA LÓGICA QUE SE INTERRELACIONE PARA QUE CUANDO
	// en cambio, lo que está pasando ahora es que hace la petición de los comentarios antes de crear el nuevo
	const tokenDecoded: ITokenData = jwtDecode(localStorage.getItem("jwt") as string);
	const [countValoration, setCountValoration] = useState("")
	const navigate = useNavigate();
	const { gameId, postId } = useParams();
	const [post, setPost]: any = useState({
		title: "",
		body: "",
	});
	const [comments, setComments]: any = useState([]);

	const [postCommentData, setPostCommentData] = useState({
		body: "",
		created_by: tokenDecoded.id,
		created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
		created_by_name: tokenDecoded.name,
		readyToPost: false, // set to true when click on createComment
	});
	const [userValorationExists, setUserValorationExists]: any = useState({
		readyToSetValoration: false, // se pone en true al clickear el botón de valoration
		checkPreviousValoration: false,
	});

	useEffect(() => {
		const FetchData = async () => {
			fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}`)
				.then((res: any) => res.json())
				.then((data: any) => setPost({
					title: data[0].title,
					body: data[0].body,
					created_by_name: data[0].created_by_name
				}));
				
		};
		FetchData().catch(console.error);
		getComments();
		
		// obtener la valoración del usuario en si para setear como true o false el valoration state
		async function userValorationExists() {
			const valExists = await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}/valoration/valorationexist`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: tokenDecoded.id,
					post_id: postId,
				}),
				mode: "cors",
			});
			const valExistsJson = await valExists.json();
			console.log("valoration exist?:", valExistsJson);
			setUserValorationExists({
				...userValorationExists,
				checkPreviousValoration: valExistsJson,
			});
		}
		userValorationExists();
		getValorations()
	}, []);

	async function getValorations() {
		const getVal = await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}/valoration`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
		});
		const valJson = await getVal.json();
		setCountValoration(JSON.stringify(valJson))
	}
	/* useEffect(() => {
		// trae número de las valoraciones
		getValorations();
	}, [countValoration]) */
	
	useEffect(() => {
		async function publishComment() {
			await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}/comments/create`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				mode: "cors",
				body: JSON.stringify({
					body: postCommentData.body,
					created_by: postCommentData.created_by,
					created_at: postCommentData.created_at,
					post_id: postId,
					created_by_name: postCommentData.created_by_name,
				}),
			});
			getComments();
		}
		if (postCommentData.created_by && postCommentData.created_at && postCommentData.body) {
			publishComment();
		}
	}, [postCommentData.readyToPost]);

	async function addValoration() {
		await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}/valoration`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			mode: "cors",
			body: JSON.stringify({
				user_id: tokenDecoded.id,
				post_id: postId,
			}),
		})
			.then((res: any) => console.log(res))
			.catch(err => console.log(err));
			getValorations()
	}
	async function deleteValoration() {
		await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}/valoration`, {
			method: "DELETE",
			headers: {
				"Content-type": "application/json",
			},
			mode: "cors",
			body: JSON.stringify({
				user_id: tokenDecoded.id,
				post_id: postId,
			}),
		})
			.then((res: any) => console.log(res))
			.catch(err => console.log(err));
			getValorations()
	}

	useEffect(() => {
		if (userValorationExists.readyToSetValoration && userValorationExists.checkPreviousValoration) {
			addValoration();
		} else if (userValorationExists.readyToSetValoration && !userValorationExists.checkPreviousValoration) {
			deleteValoration();
		}
	}, [userValorationExists.checkPreviousValoration]);

	async function getComments() {
		await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}/comments`)
			.then((res: any) => res.json())
			.then((data: any) => setComments(data));
		console.log("commenst", comments);
	}

	function handlePostComment() {
		setPostCommentData({
			...postCommentData,
			created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
			readyToPost: !postCommentData.readyToPost,
		});
	}
	function handleValoration() {
		setUserValorationExists({
			readyToSetValoration: true,
			checkPreviousValoration: !userValorationExists.checkPreviousValoration,
		});
	}
	async function handleDeletePost() {
		await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}`, {
			method: 'DELETE'
		});
		navigate(`/games/${gameId}`);
	}
	return (
		<>
			<>
				<div className="header-post">
					<div className="title-post">
						<p>{post.title}</p>
					</div>
					<div className="name-post">
						<p>{post.created_by_name}</p>
					</div>
					<div className="valoration-post">
						<span>+ {countValoration}</span>
						<button className={userValorationExists.checkPreviousValoration ? "clickeado" : ""} onClick={handleValoration}>
							{!userValorationExists.checkPreviousValoration ? "Me gusta" : "No me gusta"}
						</button>
						<button onClick={handleDeletePost}>Borrar post</button>
					</div>
				</div>

				<div className="container-post">
					<div className="body-post">
						<PrePost texto={post.body} />
					</div>
					<div className="all-comments">
						<div className="comments-post">
							<CommentComponent comments={comments} />
						</div>
						<div className="user-comment">
							<textarea
								maxLength={300}
								placeholder="Max 300 caracteres"
								value={postCommentData.body}
								onChange={e => {
									setPostCommentData({
										...postCommentData,
										body: e.target.value,
									});
								}}
								name="text_comment"
							></textarea>
							<button onClick={handlePostComment}>Enviar</button>
						</div>
					</div>
				</div>
			</>
		</>
	);
}
