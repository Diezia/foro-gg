import React from "react";
import { useParams } from "react-router-dom";
import { fakePostsDataCSGO } from "../../../../helpers/fakePostsDataCSGO";
import { PostPreview } from "../../PostPreview";
import "../../../../styles/components/_gamepage.scss"

export function GamePage() {
	const { gameId } = useParams();
	return (
		<ul>
			{/* add filter to get postPreviews by gameId */}
			<h1>{gameId}</h1>
			{fakePostsDataCSGO.map((post, i) => (
				<PostPreview key={i} title={post.title} user_id={post.user_id} valoration={post.valoration} />
			))}
		</ul>
	);
}
