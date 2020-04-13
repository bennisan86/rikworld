import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { CloseButton } from '../Navigation';
import { Input, Button } from 'antd';
import { Image, Locationpin, Delete } from '../../svgs/OtherIcons'
import Loader from 'react-loader-spinner'

class Newitem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: this.props.tempitem.msg,
            date: this.props.tempitem.date,
            lat: this.props.tempitem.lat,
            long: this.props.tempitem.long,
            image: this.props.tempitem.image,
            showerror: false,
            progress: false,
        };
    }

    componentDidMount(){
        if (this.state.date === ""){
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            this.setState({
                date: today,
            })
        }
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

    isFileImage(file) {
        return file && file['type'].split('/')[0] === 'image';
    }

    handleUpload = (image) => {
        if(this.isFileImage(image)){
            const uploadTask = this.props.firebase.strg.ref(`itempics/${image.name}`).put(image);
            uploadTask.on('state_changed', 
            (snapshot) => {
                console.log('this is progress!',snapshot);
                this.setState({ 
                    showerror: false,
                    progress: true
                });
            },
            (error) => {
                console.log(error);
            },
            () => {
                this.props.firebase.strg.ref(`itempics/`).child(image.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({
                        showerror: false, 
                        progress: false,
                        image: {
                            image: image,
                            url: url
                        }
                    });
                });
            });
        } else {
            this.setState({ 
                showerror: true,
            });
        }
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
        const { msg, date, lat, long, image, progress } = this.state;
        const { TextArea } = Input;
        const isInvalid = 
            msg !== "" &
            date !== "" &
            lat !== null &
            long !== null &
            image !== {
                image: null,
                url: ''
            };

        console.log('isInvalid',isInvalid, 'state',this.state);
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                <>
                    <CloseButton history={this.props.history} fill="#0073A7"/>
                    <div className="newitem_total">
                    <div className="newitem_img_infos">
                    <div className="centeredcolumn">
                        {image.url ?
                        <div className="uploadedtotal">
                            <div className="img_upload_total_w_img">
                                <div className="img_upload_total_canvas">
                                <img src={image.url} alt='uploaded' />
                                </div>
                            </div>
                            <Button className="deletebtn shadow" onClick={this.deleteUpload}>
                                <Delete width={20} />
                            </Button>
                        </div>
                        :
                        <div className="img_upload_total">
                            <div className="img_upload_total_canvas">
                            {!progress ? 
                                <button className="img_upload_btn shadow" onClick={this.triggerClick}>
                                    <Image width={20} />
                                </button>
                            :
                                <Loader
                                    type="Oval"
                                    color="#0073A7"
                                    width={50}
                                    height={50}
                                />
                            }
                            </div>
                            <input
                                id='selectImage'
                                hidden="hidden"
                                type="file"
                                onChange={this.handleChange} />
                        </div>
                        }
                        {this.state.showerror &&
                        <div className="errormsg"><p>Oeps! Je kan enkel foto's opladen...</p></div>}
                    </div>
                    
                    <div className="newitem_infos">
                    <Button
                    onClick={(tempdata) => this.gotoLocationdragger(tempdata)}
                    size="large"
                    className="navshadow centeredrow">
                        <div className="locatie_aanduiden_btn">
                            <Locationpin width={16} />
                            {lat && long ?
                            <div className="locatie_aanduiden_btn_latlong centeredrow">
                            <p>{long}</p><p> - </p><p>{lat}</p>
                            </div>
                            :
                            <p>locatie aanduiden op kaart</p>}
                        </div>
                    </Button>
                    <TextArea
                        rows={6}
                        type="text"
                        size="large"
                        name="msg"
                        value={msg}
                        onChange={event => this.onChangeText(event)}
                        placeholder="Jouw bericht"/>


                    <Input
                        type="date"
                        name="date"
                        size="large"
                        value={date}
                        onChange={event => this.onChangeText(event)}
                        />
                <Button className="loginbtn" disabled={!isInvalid} onClick={event => this.onCreateItem(event, authUser)}>posten!</Button>
                </div>
                </div>

                </div>
                </>
                )}
            </AuthUserContext.Consumer>
        );
    }
}


export default withFirebase(Newitem);