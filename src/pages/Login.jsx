import React from 'react'
import { imgSrc } from '../static';
import { auth, provider } from "../app/firebase"

function Login() {

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithPopup(provider).catch(error => alert(error.message));
    };

    setInterval(
        function () {
            var randomColor = Math.floor(Math.random()*16777215).toString(16);
            document.getElementById('box').style.border = "4px solid #"+randomColor;
    },2000);

  return (
    <div className='login'>
        <div className="login__inner" id="box">
            <div className="login__innerHeader">
                <img src={imgSrc.slack__icon} alt="" />
                <span>Slack</span>
            </div>
            <div className="login__middle">
                <h1>Sign in to Slack</h1>
                <p>Click the button below to continue</p>
            </div>
            <div className="login__button">
                <button onClick={signIn}>
                    <img src={imgSrc.google__icon} alt="" />
                    <p>Sign in with Google</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Login