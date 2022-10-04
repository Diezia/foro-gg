import React, { useEffect, useState } from "react"
import {useParams, Link } from "react-router-dom";
import { PostPreview } from "../../PostPreview";
import "../../../../styles/components/_gamepage.scss";

export function GamePage() {
	const { gameId } = useParams();
	const [posts, setPosts]: any = useState([]);
	useEffect(() => {
		const FetchData = async() => {
			await fetch(`http://localhost:8080/api/games/${gameId}/posts`)
			.then((res: any) => res.json())
			.then((data: any) => setPosts(data));
		}
		FetchData();
	}, [])
	return (
		<>	
			<div className="title-game">
				{gameId !== undefined && "¡Bienvenido al subforo!"}
			</div>
			<Link to={'/create'}><button>Crear post</button></Link>
			<div className="post-date">
				<ul className="container-post">
					{posts.map((post: any, i: number) => (
						<PostPreview postId={post.id} key={i} title={post.title} user_id={post.created_by} valoration={post.valoration} />
					))}
				</ul>
			</div>
		</>
	);
}
