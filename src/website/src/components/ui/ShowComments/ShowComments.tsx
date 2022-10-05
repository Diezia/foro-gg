import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Comment } from '../Comment';

export default function ShowComments({comments}: any) {
    const {gameId, postId} = useParams()
    /* useEffect(() => {
		const FetchData = async() => {
			
		}
		FetchData()
		.catch(console.error);
	}, []); */
    // console.log(comments)
    return(
        <>
            <ul>
                {comments.map((comment: any, key: number) => {
                    return <Comment body={comment.body}  key={comment.id} created_by={comment.created_by}/>
                })}
            </ul>
        </>
    )
}