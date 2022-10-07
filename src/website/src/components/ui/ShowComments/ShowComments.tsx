import React from "react";
import { Comment } from "../Comment";

export default function ShowComments({ comments }: any) {
	return (
		<>
			<ul>
				{comments.map((comment: any) => {
					return <Comment body={comment.body} key={comment.id} created_by={comment.created_by_name} />;
				})}
			</ul>
		</>
	);
}
