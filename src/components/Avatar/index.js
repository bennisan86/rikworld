import React from "react";
import avatardefault from '../Avatar/avatar_default.png';
import Avatareditor from '../Avatareditor';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';



const Avatar = (props) => {
    const imageSet = (image) => {
        props.onSetImage(image);
    };
    const classerz = 'avatarimg ' + props.className;
    switch(props.view) {
        case 'otheruser':
            return (
                <img className={classerz} src={props.otheruser} alt='useravatar' />
            );
        case 'edit_default':
            return (
                <Avatareditor onSetImage={(image) => imageSet(image)} /> 
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
