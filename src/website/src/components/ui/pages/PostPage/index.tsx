import React, {useEffect, useState} from "react";
import { CreatePostPage } from "../CreatePostPage";
import { PrePost } from "../PrePost";
import "../../../../styles/components/_postpage.scss";
import { useParams } from "react-router-dom";
import CommentComponent from "../../CommentComponent/CommentComponent";

export function PostPage() {
	const {gameId, postId} = useParams()
	const [post, setPost]: any = useState([])
	useEffect(() => {
		const FetchData = async() => {
			await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}`)
			.then((res: any) => res.json())
			.then((data: any) => setPost(data));
		}
		FetchData()
		.catch(console.error);
	}, [])
	return (
		<>
		{post.map((post: any, i: number) => (
			<>
			<div className="title-publicpost">
				<h1>{post.title}</h1>
				<span>{post.valoration}</span>
			</div>
			<div className="public-post">
				<p> 
					{post.body}
				</p>
			</div>
			</>
		))}
		<CommentComponent />
		</>
	);
}
