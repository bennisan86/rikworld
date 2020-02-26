import React, { useState, useRef, useEffect } from 'react';
import SignUpTotal, { SignUpLink } from '../Signup';
import SignInForm from '../SignIn';
import PasswordForgetTotal, { PasswordForgetLink } from '../PasswordForget';
import { Confirm } from '../../svgs/OtherIcons'

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
          <div ref={wrapperRef} className="useroverlay navshadow">
            <PasswordForgetTotal onComplete={() => setCurrentView('paswforgot2')} />
          </div>);
      case 'paswforgot2':
        return (
          <div ref={wrapperRef} className="useroverlay navshadow">
          <div className="centeredcolumn ty4signup">
            <Confirm width={32} fill={'#D1E7F3'} className="confirmer"/>
            <strong>Zo!</strong>
            <p>Een paswoord-reset werd naar je e-mailadres verstuurd.</p>
            <div className="textlink" onClick={() => setCurrentView(null)}>naar inloggen</div>
          </div>
          </div>);
      case 'signup':
        return (
          <div ref={wrapperRef} className="useroverlay navshadow">
          <SignUpTotal onComplete={() => setCurrentView('ty4signup')} />
          </div>);
      case 'ty4signup':
        return (
          <div ref={wrapperRef} className="useroverlay navshadow">
          {props.currentuser &&
          <div className="centeredcolumn ty4signup">
            <Confirm width={32} fill={'#D1E7F3'} className="confirmer"/>
            <strong>Welkom, {props.currentuser.username}!</strong>
            <p>Je kan je gegevens aanpassen door op je avatar te klikken.</p>
            <div className="textlink" onClick={() => props.onOuterClick()}>Ok, en nu posten maar!</div>
          </div>
          }
          </div>);
    default:
        return (
          <div ref={wrapperRef} className="useroverlay navshadow">
                <div>
                <SignInForm onComplete={() => props.onOuterClick()} />
                <div className="centeredrow margtop20">
                  <SignUpLink onClick={() => setCurrentView('signup')} />
                  <div className="extramarg"> • </div>
                  <PasswordForgetLink onClick={() => setCurrentView('paswforgot')}/>
                </div>
              </div>
          </div>);
    }
};


export default Useroverlay;


