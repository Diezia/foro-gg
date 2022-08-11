import React from "react";

interface PostPreviewTypes {
	title: string;
	user_id: string;
	valoration: number;
}

export function PostPreview({ title, user_id, valoration }: PostPreviewTypes) {
	return (
		<li className="gamepost">
			<p className='gp-title'>{title}</p>
			<p className="gp-user_id">{user_id}</p>
			<p className="gp-valoration">{valoration}</p>
		</li>
	);
}
