import React from "react";
import { Link, useParams } from 'react-router-dom'

interface PostPreviewTypes {
	title: string;
	user_id: string;
	valoration: number;
	postId: string
}

export function PostPreview({ title, user_id, valoration, postId}: PostPreviewTypes) {
	return (
			<li className="gamepost">
				<p className='gp-title'><Link to={`post/${postId}`}>{title}</Link></p>
				<p className="gp-user_id">{user_id}</p>
				<p className="gp-valoration">{valoration}</p>
			</li>
		
	);
}
