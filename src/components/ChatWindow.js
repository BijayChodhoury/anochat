import React, { useState, useEffect, useRef } from 'react'
import { firestore } from '../firebase'
import { addDoc, collection, getDocs } from '@firebase/firestore'
import SingleChat from './SingleChat';
import './ChatWindow.css'
import msgSendSfc from '../assets/send_sfx.mp3'


export default function ChatWindow() {

    const [chatText, setChatText] = useState("")

    // state for fetched messages
    const [dbChats, setDbChats] = useState([]);
    const [isSendBtnClicked, setIsSendBtnClicked] = useState(false)
    const scrollableDivRef = useRef(null);

    // sfx hooks
    const audioRef = useRef(null);

    const ref = collection(firestore, "messages")

    const sendMessage = async (e) => {
        if (chatText === "") {
            console.log("empty message cannot be send")
            return
        } else {
            setIsSendBtnClicked(!isSendBtnClicked)
            e.preventDefault();
            let data = {
                timeStamp: (new Date(Date.now())),
                message: chatText
            }
            try {
                addDoc(ref, data)
                console.log("Sent")
                playSound()
                clearText()
            } catch (e) {
                console.log(e)
                clearText()
            }
            const inputField = document.getElementById("inputText");
            inputField.focus();
        }
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

    // When "Enter" is pressed in Input Field
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage(event);
            console.log('Enter key pressed inside input field');
        }
    };

    // SFX Message Send
    const playSound = () => {
        audioRef.current.play();
    };


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
                        onKeyDown={handleKeyPress}
                    />
                    <button onClick={sendMessage} id='btnSend'> SEND </button>
                    <audio ref={audioRef} src={msgSendSfc} />
                </div>
            </div>
        </>
    )
}
