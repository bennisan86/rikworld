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
            avatar,
          } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '' ||
            avatar === '';

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
            placeholder="Full Name"
          />
          <Input
            name="email"
            className="inputter"
            size="large"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <Input
            name="passwordOne"
            className="inputter"
            size="large"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Input
            name="passwordTwo"
            className="inputter"
            size="large"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <Button
            size="large"
            className="loginbtn shadow margbot20"
            disabled={isInvalid}
            onClick={this.onSubmit}>
              aanmaken
              </Button>
          {error && <p>{error.message}</p>}
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