import React, { useState, useRef, useEffect } from 'react';
import SignUpTotal, { SignUpLink } from '../Signup';
import SignInTotal from '../SignIn';
import SignOutButton from '../SignOut';
import PasswordForgetTotal, { PasswordForgetLink } from '../PasswordForget';

const Useroverlay = (props) => {

    function useOutsideAlerter(ref) {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.onOuterClick();
        }
      }
      useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      });
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    const [currentView, setCurrentView] = useState(null);
    switch(currentView) {
      case 'paswforgot':
        return (
          <div ref={wrapperRef} className="useroverlay">
            <PasswordForgetTotal onComplete={() => setCurrentView('paswforgot2')} />
          </div>);
      case 'paswforgot2':
        return (
          <div ref={wrapperRef} className="useroverlay">
            <p>Een paswoord-reset werd naar je e-mailadres verstuurd.</p>
            <button onClick={() => setCurrentView(null)}>naar inloggen</button>
          </div>);
      case 'signup':
        return (
          <div ref={wrapperRef} className="useroverlay">
          <SignUpTotal onComplete={() => setCurrentView('ty4signup')} />
          </div>);
      case 'ty4signup':
        return (
          <div ref={wrapperRef} className="useroverlay">
          {props.currentuser &&
          <div>
            {props.currentuser.username}, ty for signin up!
          </div>
          }
          </div>);
    default:
        return (
          <div ref={wrapperRef} className="useroverlay">
                <div>
                <SignInTotal onComplete={() => props.onOuterClick()} />
                <br /><br />
                <SignUpLink onClick={() => setCurrentView('signup')} />
                <PasswordForgetLink onClick={() => setCurrentView('paswforgot')}/>
              </div>
          </div>);
    }
};


export default Useroverlay;


