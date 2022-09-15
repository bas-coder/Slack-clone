import React, {useState} from 'react';
import AnimationIcon from "@mui/icons-material/Animation";
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import BoldIcon from '@mui/icons-material/FormatBold';
import SubjectIcon from '@mui/icons-material/Subject';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import MicNoneIcon from "@mui/icons-material/MicNone"
import AddIcon from '@mui/icons-material/Add';
import VideocamIcon from '@mui/icons-material/Videocam';
import SmileIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import UnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import ItalicIcon from '@mui/icons-material/FormatItalic';
import EmailIcon from '@mui/icons-material/AlternateEmail';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Tooltip , Button } from '@mui/material';
import { db, auth } from "../app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from 'firebase/compat/app';
import { imgSrc } from '../static';

function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState('');
  const [user] =  useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;      
    }
    
    db.collection('rooms').doc(channelId).collection('messages').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL
    });

    chatRef.current.scrollIntoView({
      behavior: "smooth",
    })

    setInput('');
  }


  return (
    <div className='chatInput'>
      <form>
        <div className='chatInput__header'>
            <div className="chatInput__headerLeft">
                <BoldIcon />
                <ItalicIcon />
                <UnderlinedIcon />
                <div className='divider'></div>
                <AnimationIcon />
                <div className='divider'></div> 
                <FormatListNumberedIcon />
                <FormatListBulletedIcon />
                <div className='divider'></div> 
                <SubjectIcon />
                <div className='divider'></div> 
                <CodeOffIcon />
                <IntegrationInstructionsIcon />
            </div>
        </div>

        <input 
        value={input} 
        placeholder={`Message #${channelName}`} 
        onChange = {(e) => setInput(e.target.value)}
        type="text"
        required
        />

        <Button 
        hidden 
        onClick={sendMessage} 
        type='submit'>
          send
        </Button>

        <div className="chatInput__footer">
            <div className="chatInput__footerLeft">
                <div id="circleIcon">
                    <AddIcon />
                </div>
                <div className='divider'></div> 
                <div id="roundedIcon">
                    <VideocamIcon />
                </div>
                <div id="roundedIcon">
                    <MicNoneIcon />
                </div>
                <div className='divider'></div> 
                
                <SmileIcon />
                <EmailIcon />
                <TextFormatIcon />

            </div>
            <div className="chatInput__footerRight">
                <Tooltip title="Send">
                    <SendIcon  />
                </Tooltip>
                <div className="divider"></div>
                <ExpandMoreIcon />
            </div>
          </div>
      </form>
    </div>
  )
}

export default ChatInput
