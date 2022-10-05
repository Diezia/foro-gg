import React, { useEffect, useState } from "react";
import { CreatePostPage } from "../CreatePostPage";
import { PrePost } from "../PrePost";
import "../../../../styles/components/_postpage.scss";
import { useParams } from "react-router-dom";
import CommentComponent from "../../ShowComments/ShowComments";
import "../../../../styles/components/_postpage.scss";
import { useForm } from "../../../../hooks/useForm";
import jwtDecode from "jwt-decode";

interface ITokenData {
	name: string;
	id: number;
}

export function PostPage() {
	// TENGO QUE CREAR UN ESTADO COMPLETO DEL POST CON SUS COMENTARIOS Y CREAR UNA LÓGICA QUE SE INTERRELACIONE PARA QUE CUANDO 
	// en cambio, lo que está pasando ahora es que hace la petición de los comentarios antes de crear el nuevo
	const tokenDecoded: ITokenData = jwtDecode(localStorage.getItem("jwt") as string);

	const { gameId, postId } = useParams();
	const [post, setPost]: any = useState({
		title: '',
		valoration: 0,
		body: ''
	});
	const [comments, setComments]: any = useState([]);

	const [postCommentData, setPostCommentData] = useState({
		body: "",
		created_by: tokenDecoded.id,
		created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
		created_by_name: tokenDecoded.name,
		readyToPost: false, // set to true when click on createComment
	});
	const [valoration, setValoration]: any = useState(true);
	
	useEffect(() => {
		const FetchData = async () => {
			await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}`)
				.then((res: any) => res.json())
				.then((data: any) => setPost(data));
		};
		FetchData().catch(console.error);
		getComments()
	}, []);

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
					created_by_name: postCommentData.created_by_name
				}),
			})
			getComments();
		}
		if (postCommentData.created_by && postCommentData.created_at && postCommentData.body) {
			publishComment();
		}
	}, [postCommentData.readyToPost]);
	
	async function getComments() {
		await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}/comments`)
			.then((res: any) => res.json())
			.then((data: any) => setComments(data));
			console.log("commenst", comments)
	}
	/* const UpComment = async () => {
		await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}/valoration`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			mode: "cors",
		})
			.then((res: any) => console.log(res))
			.catch(err => console.log(err));
	};

	const DownComment = () => {
		console.log("Falso");
	};
	{
		valoration == true ? UpComment() : DownComment();
	} */
	console.log('postCommentData', postCommentData)
function handlePostComment() {
	setPostCommentData({
		...postCommentData,
		created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
		readyToPost: !postCommentData.readyToPost,
	})
}
	return (
		<>
				<>
					<div className="t-v-post">
						<div className="title-publicpost">
							<h1>{post.length > 0 && post[0].title}</h1>
						</div>
						<div className="valoration-post">
							<span>{post.length > 0 && post[0].valoration}</span>
							<button onClick={() => setValoration(!valoration)}>Dedo arriba</button>
						</div>
					</div>
					<div className="p-c-post">
						<div className="public-post">
							<PrePost texto={post.length > 0 && post[0].body} />
						</div>
						<div className="comment-post">
							<CommentComponent comments={comments}/>
						</div>
						<div>
							<textarea
								value={postCommentData.body}
								onChange={(e) => {
									setPostCommentData({
										...postCommentData,
										body: e.target.value,
									});
								}}
								name="text_comment"
							></textarea>
							<button
								onClick={handlePostComment}
							>
								Enviar comentario
							</button>
						</div>
					</div>
				</>
		</>
	);
}

// pseudo
/* handlePostComment onclick "enviar comentario".
handlePostComment setea lo que falte del estado del comment para que la info que se envía al back esté completa.

*/