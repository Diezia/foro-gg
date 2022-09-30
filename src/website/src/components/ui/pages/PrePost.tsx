import React from 'react'

export function PrePost (props: any) {
  function createMarkup() {
    return {__html: props.texto};
  }
  return (
    <div dangerouslySetInnerHTML={createMarkup()} className="prev-post"></div>
  )
}
