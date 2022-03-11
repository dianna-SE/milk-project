import { Button } from '@material-ui/core'
import { auth, provider } from './firebase'
import React from 'react'
import './Login.css'
import milk from './images/milk.svg'
import cow from './images/cow.jpeg'

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    };

  return (
    <div className="login">
        <div className="login_logo">
            {/*<header><img src={ milk } alt="milk"></img> MILK</header>*/}
            <img src={ cow } alt="milk"></img>
            <header>MILK</header>
            <Button onClick={ signIn }><b>Sign In</b></Button>
        </div>
    </div>
  )
}

export default Login