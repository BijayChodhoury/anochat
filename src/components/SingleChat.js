import React from 'react'
import './SingleChat.css'

export default function SingleChat(props) {
  return (
    <div id='singleChatView'>
      message: {props.msg ? props.msg : "none"} || and time: {props.sendTime ? props.sendTime : "none"}
    </div>
  )
}
