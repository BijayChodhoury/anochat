import React, { useState, useEffect } from 'react'
import { firestore } from '../firebase'
import { addDoc, collection, getDocs } from '@firebase/firestore'
import SingleChat from './SingleChat';
import './ChatWindow.css'


export default function ChatWindow() {

    const [chatText, setChatText] = useState("")
    // state for fetched messages
    const [dbChats, setDbChats] = useState([]);

    const ref = collection(firestore, "messages")

    const sendMessage = async (e) => {
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

    useEffect(() => {
        fetchData()
    }, [chatText]);


    return (
        <>
            <div id='wholeContet'>
                <div id='displayChats'>
                    {dbChats.map(item => (
                        <SingleChat msg={item.message} sendTime={new Date(item.timeStamp * 1000).toLocaleTimeString()} />
                    ))}
                    <SingleChat />
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

            {/* <div>
                <h1>Data from Firestore:</h1>
                <ul>
                    {dbChats.map(item => (
                        <li>{item.message + " " + new Date(item.timeStamp * 1000).toLocaleTimeString()}</li>
                    ))}
                </ul>
            </div>
            <input type='text' onChange={(e) => setChatText(e.target.value)} />
            <button onClick={sendMessage}> SEND </button> */}
        </>
    )
}
