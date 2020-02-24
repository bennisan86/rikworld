import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';


class About extends Component {
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
                <h1>About page</h1>
            </div>
        );
    }
}


export default About;