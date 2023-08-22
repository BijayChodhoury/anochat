import React from 'react'
import './SingleChat.css'

export default function SingleChat(props) {
  return (
    props.msg !== "" &&
    <div id='singleChatView'>
      <div id='msg'>
        {props.msg}
      </div>
      <div id='timestamp'>
        {props.sendTime}
      </div>
    </div>
  )
}
