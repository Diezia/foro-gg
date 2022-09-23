import React from "react";
import { useParams, Link } from "react-router-dom";
import { fakePostsDataCSGO } from "../../../../helpers/fakePostsDataCSGO";
import { PostPreview } from "../../PostPreview";
import "../../../../styles/components/_gamepage.scss";

export function GamePage() {
	const { gameId } = useParams();
	
	return (
		<>	
			
			<div className="title-game">
				{/* add filter to get postPreviews by gameId*/} 
				<h1>{gameId}</h1>{/*{gameId} Change gameId -> nameId */}
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
