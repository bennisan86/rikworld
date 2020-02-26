import React, { Component } from 'react';
import { CloseButton } from '../Navigation';


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
                    <CloseButton history={this.props.history} />
                <h1>About page</h1>
            </div>
        );
    }
}


export default About;