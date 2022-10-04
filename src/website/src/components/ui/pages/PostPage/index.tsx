import React, { useEffect, useState } from "react";
import { CreatePostPage } from "../CreatePostPage";
import { PrePost } from "../PrePost";
import "../../../../styles/components/_postpage.scss";
import { useParams } from "react-router-dom";
import CommentComponent from "../../CommentComponent/CommentComponent";
import "../../../../styles/components/_postpage.scss";

export function PostPage() {
	const { gameId, postId } = useParams();
	const [post, setPost]: any = useState([]);
	useEffect(() => {
		const FetchData = async () => {
			await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}`)
				.then((res: any) => res.json())
				.then((data: any) => setPost(data));
		};
		FetchData().catch(console.error);
	}, []);
	return (
		<>
			{post.map((post: any, i: number) => (
				<>
					<div className="t-v-post">
						<div className="title-publicpost">
							<h1>{post.title}</h1>
						</div>
						<div className="valoration-post">
							<span>{post.valoration}dedo arriba dedo abajo</span>
						</div>
					</div>
					<div className="p-c-post">
						<div className="public-post">
							<p>{post.body}</p>
						</div>
						<div className="comment-post">
							<CommentComponent />
						</div>
					</div>
				</>
			))}
			{/* <CommentComponent /> */}
		</>
	);
}
