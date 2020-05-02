import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Input, Button } from 'antd';
import avatardefault from '../Avatar/avatar_default.png';

  const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    errormsg: 'Er ging iets mis. Probeer het later opnieuw.',
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
          console.log(error);
          switch(error.code) {
            case 'auth/user-not-found':
              this.setState({ errormsg: "Geen gebruiker gevonden met dit e-mailadres." });
            break;
            case 'auth/wrong-password':
              this.setState({ errormsg: "Je e-mailadres en/of paswoord zijn niet correct." });
              break;
            default:
              this.setState({ errormsg: "Er ging iets mis. Probeer het later opnieuw." });
          }
          this.setState({ error });
        });
      event.preventDefault();
    };
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };


    render() {
      const { email, password, error, errormsg } = this.state;
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
            placeholder="Je inloggegevens (e-mail)"
          />
          <Input
            name="password"
            className="inputter"
            size="large"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Je paswoord"
          />
          <Button
            size="large"
            className="loginbtn shadow margbot20"
            disabled={isInvalid}
            onClick={this.onSubmit}>inloggen
          </Button>
          {error && 
          <div className="errormsg nomrg"><p>{errormsg}</p></div>}
      </div>
      );
    }
  }

  const SignInForm = withFirebase(SignInFormBase);

export default SignInForm;
