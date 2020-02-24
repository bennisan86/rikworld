import React, { useState } from 'react';
import Useroverlay from '../Useroverlay';
import Navigation, { NewButton } from '../Navigation'
import { AuthUserContext } from '../Session';


export default function List() {
    const [showOverlay, toggleShowOverlay] = useState(false);
    return (
            <div className="list_canvas">
                <>
                {
                    showOverlay && <div className="overlay">
                        <AuthUserContext.Consumer>
                            {authUser => <Useroverlay authUser={authUser} onOuterClick={() => toggleShowOverlay(false)}/>}
                        </AuthUserContext.Consumer>
                    </div>
                }
                </>
                <Navigation onClick={() => toggleShowOverlay(true)} />
                <NewButton />
            </div>
        );
    }
