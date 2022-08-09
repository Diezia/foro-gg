import React from "react";

interface PostPreviewTypes {
	title: string;
	user_id: string;
	valoration: number;
}

export function PostPreview({ title, user_id, valoration }: PostPreviewTypes) {
	return (
		<li>
			<p>{title}</p>
			<p>{user_id}</p>
			<p>{valoration}</p>
		</li>
	);
}
