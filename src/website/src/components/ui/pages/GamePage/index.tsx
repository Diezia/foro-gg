import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PostPreview } from "../../PostPreview";
import "../../../../styles/components/_gamepage.scss";

export function GamePage() {
	const [query, setQuery] = useState("");
	const [game, setGame] = useState({
		id: 0,
		name: "",
		image_url: ""
	})
	const { gameId } = useParams();
	const [posts, setPosts]: any = useState([]);
	useEffect(() => {
		const FetchData = async () => {
			await fetch(`http://localhost:8080/api/games/${gameId}/posts`)
				.then((res: any) => res.json())
				.then((data: any) => setPosts(data));
		};
		FetchData();
	}, []);

	useEffect(() => {
		const FetchData = async () => {
			await fetch(`http://localhost:8080/api/games/${gameId}`)
				.then((res: any) => res.json())
				.then((data: any) => setGame(data));
		};
		FetchData()
	}, [])
	
	return (
		<>
			<div className="title-game">{game.name}</div>
			
			<div className="search">
				<input placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)} />
			</div>
			<div className="post-date">
				<ul className="container-post">
					{posts
						.filter((post: any) => {
							if (query === "") {
								return post;
							} else if (post.title.toLowerCase().includes(query.toLowerCase())) {
								return post;
							}
						})
						.map((post: any, i: number) => (
							<PostPreview postId={post.id} key={i} title={post.title} user_id={post.created_by} valoration={post.valoration} />
						))}
				</ul>
			</div>
		</>
	);
}
