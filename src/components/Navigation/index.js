import React from 'react';
// import { AuthUserContext } from '../Session';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import Avatar from '../Avatar';

import * as ROUTES from '../../constants/routes';

function Navigation(props) {
    const user = props.currentuser;
    const maplist = props.maplist;
    return (
        <div className="top_navigation">
            <button><Link to={ROUTES.ABOUT}>about Rik.world</Link></button>
            {maplist ?
                <button onClick={props.toggleMaplist}><strong>map</strong>/list</button>
            :
                <button onClick={props.toggleMaplist}>map/<strong>list</strong></button>
            }
            <Avatar
                user={user}
                onClick={props.onClick} />
        </div>               
    );
}

const NewButton = () => { 
    return(
    <button className="newbtn_navigation"><Link to={ROUTES.NEWITEM}>+ new post</Link></button>
    )
};


const CloseButton = (props) => { 
    return(
    <button className="closebtn_navigation" onClick={() => props.history.push(ROUTES.HOME)}>x</button>
    )
};

export default withFirebase(withRouter(Navigation));
export { NewButton, CloseButton };