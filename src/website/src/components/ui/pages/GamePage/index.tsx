<<<<<<< HEAD
import React, { useEffect } from "react";
=======
import React, {useEffect} from "react";
>>>>>>> aa03e6279c5dd8f9e22681012a1dbd468aa8f86f
import { useLocation, useParams, Link } from "react-router-dom";
import { fakePostsDataCSGO } from "../../../../helpers/fakePostsDataCSGO";
import { PostPreview } from "../../PostPreview";
import "../../../../styles/components/_gamepage.scss";




export function GamePage() {
	const { gameId } = useParams();
	useEffect(() => {
		(async function(){
			try {
				const data = await fetch(`http://localhost:8080/api/games/${gameId}/posts`);
				const res = await data.json();
				console.log(res);
			} catch (error) {
				console.log(error)
			}
		}())
	}, [])
	
	return (
		<>	
			<div className="title-game">
				{/* add gameName to get postPreviews by gameId*/} 
				{/* <h1>{gameId !== undefined && games[parseInt(gameId)-1].nameGame}</h1> */}{/*{gameId} Change gameId -> nameId */}
			</div>
			<Link to={'/create'}><button>Crear post</button></Link>
			<div className="post-date">
				<ul className="container-post">
					{fakePostsDataCSGO.map((post, i) => (
						<PostPreview postId={post.link} key={i} title={post.title} user_id={post.user_id} valoration={post.valoration} />
					))}
				</ul>
			</div>
		</>
	);
}
