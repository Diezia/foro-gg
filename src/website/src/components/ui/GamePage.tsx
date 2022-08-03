import React from 'react'
import { fakePostsData } from '../../helpers/fakePostsData'
import { PostPreview } from './PostPreview'

export const GamePage = () => {
  return (
    <ul>
      {
        fakePostsData.map((post, i) => (
          <PostPreview
            key={i}
            title = {post.title}
            user_id = {post.user_id}
            valoration = {post.valoration}
          />
        ) )
      }
    </ul>
  )
}
