import React from 'react';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import AppsIcon from "@mui/icons-material/Apps";
import AddIcon from "@mui/icons-material/Add";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PodcastsIcon from "@mui/icons-material/Podcasts"
import DraftsIcon from "@mui/icons-material/Drafts";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SidebarOptions from './SidebarOptions';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../app/firebase";

function Sidebar() {
  const [channels] = useCollection(db.collection('rooms'));
  const [user] =  useAuthState(auth);

  return (
    <div className='sidebar'>
      <div className="sidebar__header">
        <div className="sidebar__info">
          <h2>SLACK HQ</h2>
            <h3>
            {user.displayName}
          </h3>
        </div>
          <CreateIcon />
      </div>
      <div>

      <SidebarOptions title="Threads"  Icon= {InsertCommentIcon} />

      <SidebarOptions title="Mentions & reactions"  Icon= {InboxIcon} />

      <SidebarOptions title="Saved Items"  Icon= {DraftsIcon} />

      <SidebarOptions title="Channel Browser"  Icon= {BookmarkBorderIcon} />

      <SidebarOptions title="People & User groups"  Icon= {PeopleAltIcon} />
    
      <SidebarOptions title="Apps"  Icon= {AppsIcon} />

      <SidebarOptions title="File browser"  Icon= {FileCopyIcon} />
      </div>

      <SidebarOptions title="Channels"  Icon= {ExpandMoreIcon} />

      <hr />

      <SidebarOptions title="Add Channel"  Icon= {AddIcon} addChannelOption />

      {channels?.docs.map(doc =>(
        <SidebarOptions 
        key={doc.id} 
        id={doc.id} 
        title={doc.data().name} 
         />
      ))}

      <div className="sidebar__footer">
        <SidebarOptions title="general"  Icon= {PodcastsIcon} />
        <div className="sidebar__footerLeft">
          <FiberManualRecordIcon />
          <HeadphonesIcon />
        </div>
      </div>

    </div>
  )
}

export default Sidebar
