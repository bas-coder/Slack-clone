import React from 'react';
import { imgSrc } from '../static';
import Header from '../components/Header';
import Chat from '../components/Chat';
import Login from "../pages/Login"
import Sidebar from "../components/Sidebar" 
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth } from '../app/firebase';
import Spinner from "react-spinkit"


function App() {

  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="app__loading">
        <div className="app__loading--Contents">
          <img src={imgSrc.slack__icon} alt="" />
          <Spinner 
          name='ball-spin-fade-loader'
          color='purple'
          fadeIn='none'
          className='spinner'
          />
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Router>

        {!user ? (
          <Login />
        ): (
        <div> 
          <Header />
          <div className="app__body">
            <Sidebar />
            <Routes>
              <Route path="/" element={ <Chat /> } />          
            </Routes>
          </div>
        </div>
        )}
              </Router>
    </div>
  );
}

export default App;
