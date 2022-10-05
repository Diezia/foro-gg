import React, { useEffect, useState } from "react";
import { CreatePostPage } from "../CreatePostPage";
import { PrePost } from "../PrePost";
import "../../../../styles/components/_postpage.scss";
import { useParams } from "react-router-dom";
import CommentComponent from "../../ShowComments/ShowComments";
import "../../../../styles/components/_postpage.scss";
import { useForm } from "../../../../hooks/useForm";

export function PostPage() {
	const { gameId, postId } = useParams();
	const [post, setPost]: any = useState([]);
	const [comment, setComment]: any = useForm({
		comment: ''
	});
	const [valoration, setValoration]: any = useState(true);
	
	useEffect(() => {
		const FetchData = async () => {
			await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}`)
				.then((res: any) => res.json())
				.then((data: any) => setPost(data));
		};
		FetchData().catch(console.error);
	}, []);

	const UpComment = async() =>  {
		await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}/valoration`, {
			method: 'POST',
			headers: {
				"Content-type": 'application/json'
			},
			mode: "cors"
		})
		.then((res: any) => console.log(res))
		.catch(err => console.log(err));
	}

	const DownComment = () => {
		console.log('Falso')
	}
	{valoration == true ? UpComment() : DownComment()}

	return (
		<>
			{post.map((post: any, i: number) => (
				<>
					<div className="t-v-post">
						<div className="title-publicpost">
							<h1>{post.title}</h1>
						</div>
						<div className="valoration-post">
							<span>{post.valoration}</span><button onClick={() => setValoration(!valoration)}>Dedo arriba</button>
						</div>
					</div>
					<div className="p-c-post">
						<div className="public-post">
							<p>{post.body}</p>
						</div>
						<div className="comment-post">
							<CommentComponent />
						</div>
						<div>
							<textarea value={comment.text_comment} onChange={setComment} name="text_comment">

							</textarea>
							<button type="submit">Enviar comentario</button>
						</div>
					</div>
				</>
			))}
		</>
	);
}
