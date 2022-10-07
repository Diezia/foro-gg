import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'

interface PostPreviewTypes {
	title: string;
	user_id: string;
	valoration: number;
	postId: string;
	gameId: string;
	created_by_name: string;
}

export function PostPreview({ title, user_id, valoration, postId, gameId, created_by_name}: PostPreviewTypes) {
	const [countValoration, setCountValoration] = useState("")

	useEffect(() => {
		async function getValorations() {
			const getVal = await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}/valoration`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				mode: "cors",
			});
			const valJson = await getVal.json();
			setCountValoration(JSON.stringify(valJson))
		}
		getValorations()
	}, [])
	
	return (
			<li className="gamepost">
				<p className='gp-title'><Link to={`post/${postId}`}>{title}</Link></p>
				<p className="gp-user_id">{created_by_name}</p>
				<p className="gp-valoration">{countValoration}</p>
			</li>
		
	);
}
