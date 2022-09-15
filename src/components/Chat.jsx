import React, {useEffect, useRef} from 'react'
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1Outlined"
import { useSelector } from "react-redux";
import { imgSrc } from '../static';
import { selectRoomId } from "../features/appSlice";
import Message from "../components/Message";
import ChatInput from './ChatInput';
import { db } from "../app/firebase";
import {useCollection, useDocument } from "react-firebase-hooks/firestore";


function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);

  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
    )

    const [roomMessage, loading] = useCollection(
      roomId &&
      db.collection('rooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
    );
    
    useEffect(() => {
      chatRef?.current?.scrollIntoView({
        behavior: "smooth",
      });
      
    }, [roomId, loading])

  return (
    <div className='chat'>
      {roomDetails && roomMessage && <div> 
        <div className="chat__header">
         <div className="chat__headerLeft">
            <h3><b>#{roomDetails?.data().name}</b></h3>

            <ExpandMoreIcon />

            <p className='edit'>
              {roomDetails?.data().name} is amazing
              <span>
                <a href="mail.google.com">Edit</a> 
              </span> 
            </p>

         </div>
         <div className="chat__headerRight">
              <img src={ imgSrc.header__avatar } alt="U" /><span>1</span>
              <div className='divider'></div>
              <PersonAddAlt1 />
         </div>
      </div>

      <div className="chat__message">
        {roomMessage?.docs.map(doc => {
          const { message, timestamp, user, userImage} = doc.data();

          return (
            <Message 
              key={doc.id}
              message = {message}
              timestamp = {timestamp}
              user = {user}
              userImage = {userImage} 
            />
          )
        })}

        <div ref= {chatRef} className="chat__bottom"></div>
        
      </div>
      </div>} 
        
      {/* {!roomDetails && !roomMessage && <div></div>} */}

      <ChatInput
          chatRef = {chatRef}
          channelName={roomDetails?.data().name}
          channelId={ roomId } 
      />
    </div>
  )
}

export default Chat