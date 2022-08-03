import React from 'react'

export const PostPreview = ({title, user_id, valoration}: any) => {
  return (
    <li>
      <p>{title}</p>
      <p>{user_id}</p>
      <p>{valoration}</p>
    </li>
  )
}
