import React from 'react';
// import { AuthUserContext } from '../Session';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import Avatar from '../Avatar';
// import AboutRik from '../../imgs/aboutrik.png'
import AboutIcon from '../../svgs/AboutIcon'
import Plus, { Cancel } from '../../svgs/OtherIcons'
import Locater, { List } from '../../svgs/ToggleIcons'

import * as ROUTES from '../../constants/routes';

function Navigation(props) {
    const user = props.currentuser;
    const maplist = props.maplist;
    return (
        <div className="top_navigation">
            <Link to={ROUTES.ABOUT}>
                {/* <img className="abouticon" src={AboutRik} /> */}
                <AboutIcon width={60} viewBox={'0 0 52 56'} />
                </Link>
            {maplist ?
                <div className="toggleswitch" onClick={props.toggleMaplist}>
                    <div className="toggleswitch_part_right">
                    <Locater width={24} />
                    </div>
                    <div className="toggleswitch_part_left">
                    <List className={'opac20'} width={24} />
                    </div>
                </div>
            :
                <div className="toggleswitch" onClick={props.toggleMaplist}>
                    <div className="toggleswitch_part_right">
                    <Locater className={'opac20'} width={24} />
                    </div>
                    <div className="toggleswitch_part_left">
                    <List width={24} />
                    </div>
                </div>
            }
            <Avatar
                className={"navshadow"}
                user={user}
                onClick={props.onClick} />
        </div>               
    );
}

const NewButton = (props) => {
    const buttonStyle = "newbtn_navigation navshadow " + props.buttonStyle;
    return(
    <div className="newbtn_navigation_container">
    <button className={buttonStyle}><Link to={ROUTES.NEWITEM}><Plus width={28}/></Link></button>
    </div>
    )
};


const CloseButton = (props) => { 
    return(
    <button className="closebtn_navigation" onClick={() => props.history.push(ROUTES.HOME)}>
        <Cancel width={20} fill={props.fill} />
    </button>
    )
};

export default withFirebase(withRouter(Navigation));
export { NewButton, CloseButton };