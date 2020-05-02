import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Avatar from '../Avatar';
import { Input, Button } from 'antd';

const SignUpTotal = (props) => (
      <SignUpForm onComplete={props.onComplete} />
  );

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    errormsg: 'Er ging iets mis. Probeer het later opnieuw.',
    avatar: ''
  };
  
  class SignUpFormBase extends Component {
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        const { username, email, passwordOne, avatar } = this.state;
        const roles = {};

        this.props.firebase
          .doCreateUserWithEmailAndPassword(email, passwordOne)
          .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            avatar,
            roles,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.onComplete();
        // this.props.history.push(ROUTES.MAP);
      })
          .catch(error => {
            this.setState({ error });
          });
        event.preventDefault();
    }
    onChange = event => {
        // if (this.state.passwordOne.length > 4 && this.state.passwordTwo.length > 4){
        //   if(this.state.passwordOne !== this.state.passwordTwo){
        //     this.setState({
        //       error: true,
        //       errormsg: "Je paswoorden zijn niet identiek."
        //     });
        //   } else {
        //     this.setState({
        //       error: null,
        //       errormsg: 'Er ging iets mis. Probeer het later opnieuw.',
        //     });       
        //   }
        //   console.log("passwordOne,passwordTwo:",this.state.passwordOne,this.state.passwordTwo);
        // }
        this.setState({ [event.target.name]: event.target.value });

      }

    setImage = image => {
      this.setState({ avatar: image });
    }
    render() {
      const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
            errormsg,
            avatar,
          } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '' ||
            avatar === '';

        const wrongPass = (passwordTwo.length > 5) && (passwordOne !== passwordTwo);


        return (
          <div>
            <Avatar
                view='edit_default'
                onSetImage={(image) => this.setImage(image)}/>
            <Input
            name="username"
            className="inputter"
            size="large"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Kies een gebruikersnaam"
          />
          <Input
            name="email"
            className="inputter"
            size="large"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Geef je e-mail op"
          />
          <Input
            name="passwordOne"
            className="inputter"
            size="large"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Kies een paswoord (min. 6 tekens)"
          />
          <Input
            name="passwordTwo"
            className="inputter"
            size="large"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Herhaal je paswoord"
          />
          {wrongPass && <div className="pasw_error"><p>Je paswoorden zijn niet identiek.</p></div>}
          <Button
            size="large"
            className="loginbtn shadow margbot20"
            disabled={isInvalid}
            onClick={this.onSubmit}>
              aanmaken
              </Button>
              {isInvalid &&
            <div className="conditions"><p>Om een account te creëren moet je een foto, een gebruikersnaam, een e-mailadres en een paswoord van minstens 6 tekens opgeven.</p></div>}
          {error &&
          <div className="errormsg nomrg"><p>{errormsg}</p></div>}
        </div>
      );
    }
  }
  
  const SignUpLink = (props) => (
      <div className="textlink" onClick={props.onClick}>Geen account?</div>
  );
const SignUpForm = withFirebase(SignUpFormBase);


export default SignUpTotal;
export { SignUpForm, SignUpLink };