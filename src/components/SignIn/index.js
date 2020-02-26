import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Input, Button } from 'antd';
import avatardefault from '../Avatar/avatar_default.png';

  const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
  };

  class SignInFormBase extends Component {
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
      const { email, password } = this.state;
      this.props.firebase
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.onComplete();
          // this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          this.setState({ error });
        });
      event.preventDefault();
    };
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };


    render() {
      const { email, password, error } = this.state;
      const isInvalid = password === '' || email === '';
      return (
      <div className="centeredcolumn">
        <img className="avatarimg margbot20" src={avatardefault} alt="default avatar" />
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
            name="password"
            className="inputter"
            size="large"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Button
            size="large"
            className="loginbtn shadow margbot20"
            disabled={isInvalid}
            onClick={this.onSubmit}>inloggen
          </Button>
          {error && <p>{error.message}</p>}
      </div>
      );
    }
  }

  const SignInForm = withFirebase(SignInFormBase);

export default SignInForm;
