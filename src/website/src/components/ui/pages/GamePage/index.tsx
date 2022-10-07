import React, { useEffect, useState } from "react";
import { useParams, Link, Params } from "react-router-dom";
import { PostPreview } from "../../PostPreview";
import "../../../../styles/components/_gamepage.scss";

export function GamePage() {
	const [query, setQuery] = useState("");
	const [game, setGame] = useState({
		id: 0,
		name: "",
		image_url: "",
	});
	const { gameId }: any = useParams();
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		const FetchData = async () => {
			await fetch(`http://localhost:8080/api/games/${gameId}/posts`)
				.then((res: Response) => res.json())
				.then((data: React.SetStateAction<never[]>) => setPosts(data));
		};
		FetchData();
	}, []);

	useEffect(() => {
		const FetchData = async () => {
			await fetch(`http://localhost:8080/api/games/${gameId}`)
				.then((res: Response) => res.json())
				.then(
					(
						data: React.SetStateAction<{
							id: number;
							name: string;
							image_url: string;
						}>
					) => setGame(data)
				);
		};
		FetchData();
	}, []);

	return (
		<>
			<div className="title-game">{game.name}</div>

			<div className="search-bar">
				<input placeholder="Enter Post Title" onChange={event => setQuery(event.target.value)} />
			</div>
			<div className="post-date">
				<ul className="container-list">
					{posts
						.filter((post: Storage) => {
							if (query === "") {
								return post;
							} else if (post.title.toLowerCase().includes(query.toLowerCase())) {
								return post;
							}
						})
						.map((post: Storage, i: number) => (
							<PostPreview
								created_by_name={post.created_by_name}
								gameId={gameId}
								postId={post.id}
								key={i}
								title={post.title}
								user_id={post.created_by}
								valoration={post.valoration}
							/>
						))}
				</ul>
			</div>
		</>
	);
}
