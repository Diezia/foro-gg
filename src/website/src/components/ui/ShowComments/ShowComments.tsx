import React, { useState, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import { Comment } from "../Comment";

export default function ShowComments({ comments }: any) {
	const { gameId, postId } = useParams();

	return (
		<>
			<ul>
				{comments.map((comment: Storage, key: number) => {
					return <Comment body={comment.body} key={comment.id} created_by={comment.created_by_name} />;
				})}
			</ul>
		</>
	);
}
