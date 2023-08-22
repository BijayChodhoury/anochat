import React, { useState, useEffect, useRef } from 'react'
import { firestore } from '../firebase'
import { addDoc, collection, getDocs } from '@firebase/firestore'
import SingleChat from './SingleChat';
import './ChatWindow.css'


export default function ChatWindow() {

    const [chatText, setChatText] = useState("")
    // state for fetched messages
    const [dbChats, setDbChats] = useState([]);
    const [isSendBtnClicked, setIsSendBtnClicked] = useState(0)
    const scrollableDivRef = useRef(null);

    const ref = collection(firestore, "messages")

    const sendMessage = async (e) => {
        setIsSendBtnClicked(() => isSendBtnClicked + 1)
        e.preventDefault();
        let data = {
            timeStamp: (new Date(Date.now())),
            message: chatText
        }
        try {
            addDoc(ref, data)
            console.log("Sent")
            clearText()
        } catch (e) {
            console.log(e)
            clearText()
        }
        const inputField = document.getElementById("inputText");
        inputField.focus();
    }

    const clearText = () => {
        setChatText("")
    }

    // Used to fetch messages from firestore
    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, "messages"));
                const documents = querySnapshot.docs.map(doc => doc.data());
                const sortedMsgs = documents.sort((a, b) => a.timeStamp - b.timeStamp);
                setDbChats(sortedMsgs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData()
    }, [isSendBtnClicked]);

    // Function to scroll to the bottom of the div
    const scrollToBottom = () => {
        const div = scrollableDivRef.current;
        if (div) {
            div.scrollTop = div.scrollHeight;
        }
    };

    // Automatically scroll to the bottom when the component is mounted
    useEffect(() => {
        scrollToBottom();
    }, [dbChats]);



    return (
        <>
            <div id='wholeContet'>
                <div id='displayChats' ref={scrollableDivRef} >
                    {dbChats.map((item, index) => (
                        <SingleChat key={index} msg={item.message} sendTime={new Date(item.timeStamp * 1000).toLocaleTimeString()} />
                    ))}
                </div>
                <div id='sendMessage'>
                    <input
                        type='text'
                        value={chatText}
                        onChange={(e) => setChatText(e.target.value)}
                        id='inputText'
                    />
                    <button onClick={sendMessage} id='btnSend'> SEND </button>
                </div>
            </div>
        </>
    )
}
