import React from "react";
interface Comments {
	body: string;
	created_by: number;
}

export function Comment({ body, created_by}: Comments) {
	return (
			<li className="">
				<p className=''>{body}</p>
				<p className="">{created_by}</p>
			</li>
	);
}