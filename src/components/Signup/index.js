import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import Avatar from '../Avatar';

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
      console.log(">>>>",this.state.avatar);
      const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
          } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
          <div>
            <Avatar
              view='edit_default'
              onSetImage={(image) => this.setImage(image)}/>
            <form onSubmit={this.onSubmit}>
            <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
            Sign Up</button>
        {error && <p>{error.message}</p>}
        </form>

        </div>
      );
    }
  }
  
  const SignUpLink = (props) => (
      <button onClick={props.onClick}>Geen account?</button>
  );
const SignUpForm = withFirebase(SignUpFormBase);


export default SignUpTotal;
export { SignUpForm, SignUpLink };