import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar.js';
import Settings from './Settings.js';
import { selectUser } from './features/userSlice';
import Login from './Login';
import { login, logout } from './features/userSlice'
import { auth } from './firebase'


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("user is ", authUser);
      if (authUser) {
        //User is logged in
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
        })
      );
    } else {
        //User is logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);



  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
          <Settings />
        </>
      ): (
          <Login />
      )}
    </div>
  );
}

export default App;
