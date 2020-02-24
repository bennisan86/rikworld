import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

const SignInTotal = (props) => (
  <div>
    <h1>SignIn</h1>
    <SignInForm onComplete={props.onComplete} />
  </div>
);


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
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign In
          </button>
          {error && <p>{error.message}</p>}
        </form>
      );
    }
  }

  const SignInForm = withFirebase(SignInFormBase);

export default SignInTotal;
export { SignInForm };