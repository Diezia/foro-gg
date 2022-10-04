import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ShowComments } from '../ShowComments';

export default function CommentComponent() {
    const [comments, setComments]: any = useState([]);
    const {gameId, postId} = useParams()
    useEffect(() => {
		const FetchData = async() => {
			await fetch(`http://localhost:8080/api/games/${gameId}/posts/${postId}/comments`)
			.then((res: any) => res.json())
			.then((data: any) => setComments(data));
		}
		FetchData()
		.catch(console.error);
	}, []);
    return(
        <>
            <ul>
                {comments.map((comment: any, key: number) => {
                    return <ShowComments body={comment.body}  key={key} created_by={comment.created_by}/>
                })}
            </ul>
        </>
    )
}