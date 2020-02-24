import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { CloseButton } from '../Navigation';

class Newitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: this.props.tempitem.msg,
            date: this.props.tempitem.date,
            lat: this.props.tempitem.lat,
            long: this.props.tempitem.long,
            image: this.props.tempitem.image,
        };
    }

    onCreateItem = (event, authUser) => {

        const date = new Date(this.state.date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        const humandate = date.toLocaleDateString('nl-BE',options);
          console.log('humandate:',humandate);

        this.props.firebase.items().push({
            msg: this.state.msg,
            date: humandate,
            lat: this.props.tempitem.lat,
            long: this.props.tempitem.long,
            image: this.state.image,
            userId: authUser.uid,   
        });
        event.preventDefault();
        this.props.onSubmit(
            {
                msg: '',
                date: '',
                lat: null,
                long: null,
                image: {
                    image: null,
                    url: ''
                }
            }
        );
        this.props.history.push(ROUTES.HOME);
    }
    onChangeText = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    gotoLocationdragger = (tempdata) => {
        this.props.onSubmit(
            {
                msg: this.state.msg,
                date: this.state.date,  
                lat: this.state.lat,
                long: this.state.long,
                image: this.state.image,
            }
        );
        this.props.history.push(ROUTES.LOCATIONDRAGGER);
    }

    handleChange = event => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState({ 
                image: {
                    image: image
                }
            });
            this.handleUpload(image);
        }
    }

    handleUpload = (image) => {        
        const uploadTask = this.props.firebase.strg.ref(`itempics/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot) => {
            //progress function ...
        },
        (error) => {
            console.log(error);
        },
        () => {
            this.props.firebase.strg.ref(`itempics/`).child(image.name).getDownloadURL().then(url => {
                console.log(url);
                this.setState({ 
                    image: {
                        image: image,
                        url: url
                    }
                });
            });
        });
    }

    deleteUpload = () => {
        const delimage = this.state.image.image.name;
        let state = this;
        this.props.firebase.strg.ref(`itempics/`).child(delimage).delete().then(function() {
            state.setState({ 
                image: {
                    image: null,
                    url: ''
                    }
            });
          }).catch(function(error) {
            console.log('Oops!',error);
          });
    }

    triggerClick = () => {
        document.getElementById("selectImage").click()
      }

    render(){
        const { msg, date } = this.state;
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                <div className="newitem_total">
                    <CloseButton history={this.props.history} />
                    {this.state.image.url ?
                        <div>
                            <img src={this.state.image.url} />
                            <button onClick={this.deleteUpload}>delete?</button>
                        </div> :
                        <div>
                            <button onClick={this.triggerClick}>Choose image now, baby!</button>
                            <input
                                id='selectImage'
                                hidden="hidden"
                                type="file"
                                onChange={this.handleChange} />
                        </div>
                    }
                    <input
                        type="text"
                        name="msg"
                        value={msg}
                        onChange={event => this.onChangeText(event)}
                        placeholder="Message"/>
                    <input
                        type="date"
                        name="date"
                        value={date}
                        onChange={event => this.onChangeText(event)}
                        placeholder="Date"/>
                        {this.props.tempitem.lat && this.props.tempitem.long ? 
                        <div>
                        <p>Latitude: {this.props.tempitem.lat}</p>
                        <p>Longitude: {this.props.tempitem.long}</p>
                        </div> :
                    <button onClick={(tempdata) => this.gotoLocationdragger(tempdata)}>add location</button>}

                    <button onClick={event => this.onCreateItem(event, authUser)}>click</button>
                </div>
                )}

            </AuthUserContext.Consumer>
        );
    }
}


export default withFirebase(Newitem);