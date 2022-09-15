import React from 'react';
import { Tooltip } from '@mui/material';
import { imgSrc } from '../static';
import MenuIcon from '@mui/icons-material/Menu'; 
import SearchIcon from "@mui/icons-material/Search";
import EastIcon from '@mui/icons-material/East';
import WestIcon from '@mui/icons-material/West';
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../app/firebase';

function Header() {

    const [user] =  useAuthState(auth);

  return (
    <div className='header'>
        <div className="header__container">            
            <div className="header__left">
                <div className="header__avatar">
                    <MenuIcon />  
                </div>
                <div className="header__leftRight">
                    <WestIcon fontSize='small' />
                    <EastIcon fontSize='small' />
                    <AccessTimeIcon />
                    </div>
            </div>

            <div className="header__search">
                <input type="text" placeholder='Search Alabson.inc' />
                <SearchIcon />
            </div>

            <div className="header__right">
                <HelpOutlineIcon />
                <div className="header__rightImg" >
                    <Tooltip title={user?.displayName}>
                        <div>
                            {!user.photoURL && <img src= {imgSrc.header__avatar} alt={""} />}
                            {user.photoURL && <img className='google__img' src= {user?.photoURL} alt={""} />}
                        </div>
                    </Tooltip>
                    <Tooltip title="Logout">
                        <div onClick={() => auth.signOut()} className='fiber_record'></div>
                    </Tooltip>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Header;



