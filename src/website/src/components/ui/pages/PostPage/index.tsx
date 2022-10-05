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
	const tokenDecoded: ITokenData = jwtDecode(localStorage.getItem("jwt") as string);

	const { gameId, postId } = useParams();
	const [post, setPost]: any = useState([]);
	const [postCommentData, setPostCommentData] = useState({
		body: "",
		created_by: tokenDecoded.id,
		created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
		readyToPost: false, // set to true when click on createComment
	});
	const [valoration, setValoration]: any = useState(true);
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
				}),
			});
		}
		if (postCommentData.readyToPost && postCommentData.created_by && postCommentData.created_at && postCommentData.body) {
			publishComment();
		}
	}, [postCommentData]);
	useEffect(() => {
		const FetchData = async () => {
			await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}`)
				.then((res: any) => res.json())
				.then((data: any) => setPost(data));
		};
		FetchData().catch(console.error);
	}, []);

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

	return (
		<>
			{post.map((post: any, i: number) => (
				<>
					<div className="t-v-post">
						<div className="title-publicpost">
							<h1>{post.title}</h1>
						</div>
						<div className="valoration-post">
							<span>{post.valoration}</span>
							<button onClick={() => setValoration(!valoration)}>Dedo arriba</button>
						</div>
					</div>
					<div className="p-c-post">
						<div className="public-post">
							<PrePost texto={post.body} />
						</div>
						<div className="comment-post">
							<CommentComponent />
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
								onClick={() => {
									setPostCommentData({
										...postCommentData,
										created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
										readyToPost: true,
									});
								}}
							>
								Enviar comentario
							</button>
						</div>
					</div>
				</>
			))}
		</>
	);
}
