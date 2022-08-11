import React from "react";
import { useParams } from "react-router-dom";
import { fakePostsDataCSGO } from "../../../../helpers/fakePostsDataCSGO";
import { PostPreview } from "../../PostPreview";
import "../../../../styles/components/_gamepage.scss"

export function GamePage() {
	const { gameId } = useParams();
	return (
		<ul className="container-post">
			{/* add filter to get postPreviews by gameId */}
			<h1 id="gameid">{gameId}</h1>{/*Change gameId -> nameId*/} 
			{fakePostsDataCSGO.map((post, i) => (
				<PostPreview key={i} title={post.title} user_id={post.user_id} valoration={post.valoration} />
			))}
		</ul>
	);
}
