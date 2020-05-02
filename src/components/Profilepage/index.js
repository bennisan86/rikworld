import React, { useState,useEffect } from 'react';
import SignOutButton from '../SignOut';
import Avatar from '../Avatar';
import Loader from 'react-loader-spinner'
import { CloseButton } from '../Navigation';
import { Edit, Cancel, Confirm } from '../../svgs/OtherIcons';
import { Collapse, Input } from 'antd';
import { Listitem } from '../Homepage';
import * as ROUTES from '../../constants/routes';

import Masonry from 'react-masonry-css'


const Profile = (props) => {
    const [currentView, setCurrentView] = useState('');
    const [myItems,setMyItems] = useState(null);
    const [newAvatar, setNewavatar] = useState(null);
    const [newUsername, setNewusername] = useState(null);
    const [showBoolean, toggleShowboolean] = useState(true);
    const [itemTxt, setItemtxt] = useState('blablabla');

    const { Panel } = Collapse;
    const user = props.currentuser;

    const breakpointColumnsObj = {
        default: 3,
        1100: 3,
        700: 2,
        500: 1
      };

    const showItemOnMap = (item) => {
        props.history.push(ROUTES.HOME);
        props.showItemOnMap(item);
    }

    useEffect(() => {
        setMyItems(props.myItemsList);
        if(myItems !== null) {
            const l = myItems.length;
            if (l <= 1){
                setItemtxt("je hebt 1 item gepost.");
            } else {
                setItemtxt("je hebt "+l+" items gepost.");
            }
        }
    },[props.myItemsList, myItems]);

    const setNewStuff = (dinges) => {
        setCurrentView('');
        props.newUserStuff(dinges);
    };

    switch(currentView) {
        case 'editinfo':
          return (
                <>
                <CloseButton history={props.history} fill="#0073A7" />
                <div className="profilepage_total">
                    <div className="profilepage_top">
                        {user ?
                        <>
                            <Avatar
                                view="edit_profile"
                                className="profilepage_avatar"
                                user={user}
                                onSetImageandClick={(image) => setNewavatar(image)}
                                triggerClick={() => toggleShowboolean(!showBoolean)}/>
                            {showBoolean &&
                            <>
                            <Input
                                size="large"
                                defaultValue={user.username}
                                onChange={e => setNewusername(e.target.value)}
                                type="text"
                                placeholder="Je gebruikersnaam"/>
                            <div className="centeredrow margtop50">
                                <button className="avatar_cc_btn shadow" onClick={() => setCurrentView("")}>
                                <Cancel width={14}/>
                                </button>
                                <button className="avatar_cc_btn shadow" onClick={() => setNewStuff({newAvatar,newUsername})}>
                                <Confirm width={22}/>
                                </button>
                            </div>
                            </>
                            }
                        </>
                        :
                        <div className="profilepage_top_loader">
                            <Loader
                            type="ThreeDots"
                            color="#CDCDCD"
                            width={50}
                            height={50}
                            />
                        </div>
                        }
                    </div>
                    <div className="profilepage_middle centeredcolumn opac20">
                        <div className="profilepage_useritems">
                        {myItems ?
                        <>
                        <p>{itemTxt}</p>
                        <Collapse
                            bordered={false}
                            defaultActiveKey={['0']}>
                            <Panel header="toon mijn items" key="1">
                            <div className="list">
                            <Masonry
                            breakpointCols={breakpointColumnsObj}
                            className="my-masonry-grid widthy"
                            columnClassName="my-masonry-grid_column">
                                {myItems &&
                                myItems.map((item) => (
                                    <Listitem
                                    key={item.uid}
                                    item={item}
                                    onClick={() => showItemOnMap(item)}/>
                                ))
                                }
                            </Masonry>
                            </div>
                            </Panel>
                        </Collapse>
                        </>
                        :
                        <p className="noneyet">Je hebt nog geen items gepost.</p>
                        }
                        </div>
                    </div>
                    <div className="profilepage_bottom opac20">
                        <SignOutButton disabled={true} mrg="jooo" />
                    </div>
                </div>
                </>
            );
        default:
            return (
                <>
                <CloseButton history={props.history} fill="#0073A7" />
                <div className="profilepage_total">
                    <div className="profilepage_top">
                        {user ?
                        <>
                        <Avatar view="profile" className="profilepage_avatar" user={user}/>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        </>
                        :
                        <div className="profilepage_top_loader">
                            <Loader
                            type="ThreeDots"
                            color="#CDCDCD"
                            width={50}
                            height={50}
                            />
                        </div>
                        }
                    </div>
                    <div className="profilepage_middle centeredcolumn">
                        <button className="profilepage_middle_btn shadow" onClick={() => setCurrentView("editinfo")}>
                            <Edit width={16}/>
                        </button>
                        <div className="profilepage_useritems">
                        {myItems ?

                        <>
                            <p>{itemTxt}</p>
                            <Collapse
                                bordered={false}
                                defaultActiveKey={['0']}>
                                <Panel header="toon mijn items" key="1">
                                <div className="list">
                                <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid widthy"
                                columnClassName="my-masonry-grid_column">
                                    {myItems &&
                                    myItems.map((item) => (
                                        <Listitem
                                        key={item.uid}
                                        item={item}
                                        onClick={() => showItemOnMap(item)}/>
                                    ))
                                    }
                                </Masonry>
                                </div>
                                </Panel>
                            </Collapse>
                        </>
                        :
                        <p className="noneyet">Je hebt nog geen items gepost.</p>
                        }
                        </div>
                    </div>
                    <div className="profilepage_bottom">
                        <SignOutButton />
                    </div>
                </div>
                </>
                );
        }
}

export default Profile;