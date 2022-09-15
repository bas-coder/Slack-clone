import React from 'react';
import TagIcon from '@mui/icons-material/Tag';
import { db } from "../app/firebase";
import { useDispatch } from 'react-redux';
import { enterRoom } from '../features/appSlice';

function SidebarOptions({title, Icon, addChannelOption, id}) {

    const dispatch = useDispatch();

   const addChannel = () => {
     const channelName = prompt("Please enter the channel name");

     if (channelName) {
        db.collection('rooms').add({
          name: channelName,
        })
     }
   } 

   const selectChannel = () => {
      if (id) {
        dispatch(enterRoom({
          roomId: id 
        }))
      }
   }

  return (
    <div onClick={
        addChannelOption ? addChannel : selectChannel
        } className='sidebarOptions'>
        {Icon && <Icon id="icon" fontSize="small" />}
        {Icon ? (

        <h4>{title}</h4>

        ): (
            <div className="sidebarOptions__channel">
                <h3>
                  <span><TagIcon fontSize="small" /></span>
                  {title}
                </h3>
            </div>
        )}
    </div>
  )
}

export default SidebarOptions