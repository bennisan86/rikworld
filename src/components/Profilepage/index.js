import React, { Component } from 'react';
import SignOutButton from '../SignOut';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
    }
    render(){

        return (
            <div className="">
                <h1>Profile page</h1>
                <SignOutButton />

            </div>
        );
    }
}


export default Profile;