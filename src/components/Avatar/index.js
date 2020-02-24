import React, { useState } from "react";
import avatardefault from '../Avatar/avatar_default.png';
import Avatareditor from '../Avatareditor';

import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';



const Avatar = (props) => {
    const [currentView, setCurrentView] = useState(props.view);
    const imageSet = (image) => {
        props.onSetImage(image);
    };
    switch(currentView) {
        case 'otheruser':
            return (
                <img className="avatarimg" src={props.otheruser} />
            );
        case 'edit_default':
            return (
                <Avatareditor onSetImage={(image) => imageSet(image)} /> 
            );
        default:
        return (
            <div>
            {props.user ?
                <Link to={ROUTES.PROFILE}><img onClick={props.toProfile} className="avatarimg" src={props.user.avatar} /></Link>
            :
            <img className="avatarimg" onClick={props.onClick} src={avatardefault} />
            }
            </div>
          );
    }
    }


export default Avatar;
