import React from "react";
import avatardefault from '../Avatar/avatar_default.png';
import Avatareditor from '../Avatareditor';
import avataredit from '../Avatareditor/avatar_edit.png';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';



const Avatar = (props) => {
    const imageSet = (image) => {
        props.onSetImage(image);
    };
    const imageSetandClick = (image) => {
        props.onSetImageandClick(image);
        props.triggerClick();
    };
    const logGer = () => {
        console.log('this');
    }
    const classerz = 'avatarimg ' + props.className;
    switch(props.view) {
        case 'otheruser':
            return (
                <img className={classerz} src={props.otheruser} alt='useravatar' />
            );
        case 'edit_default':
            return (
                <Avatareditor
                    triggerClick={() => logGer()}
                    image={avataredit}
                    onSetImage={(image) => imageSet(image)} /> 
            );
        case 'profile':
            return (
                <img  className={classerz} src={props.user.avatar} alt='current user avatar' />
            );
        case 'edit_profile':
            return (
                <Avatareditor
                    classerzzz="profile_editor"
                    triggerClick={() => props.triggerClick()}
                    image={props.user.avatar}
                    onSetImage={(image) => imageSetandClick(image)} /> 
            );
        default:
        return (
            <div className="minimarg">
            {props.user ?
                <Link to={ROUTES.PROFILE}><img onClick={props.toProfile} className={classerz} src={props.user.avatar} alt='current user avatar' /></Link>
            :
            <img  className={classerz} onClick={props.onClick} src={avatardefault} alt='defaultavatar' />
            }
            </div>
          );
    }
    }


export default Avatar;
