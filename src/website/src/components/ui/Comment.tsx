import React from "react";
interface Comments {
	body: string;
	created_by: number;
}

export function Comment({ body, created_by }: Comments) {
	return (
		<li className="">
			<p className="user-id">{created_by}:</p>
			<p className="">{body}</p>
		</li>
	);
}
