import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Input, Button } from 'antd';

const PasswordForgetTotal = (props) => (
  <div>
    <PasswordForgetForm onComplete={props.onComplete} />
  </div>
);
const INITIAL_STATE = {
  email: '',
  error: null,
};
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.onComplete();
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
    const { email, error } = this.state;
    const isInvalid = email === '';
    return (

<div>
      <p className="centeredtxt">Paswoord vergeten?</p>
      <Input
      // name="passwordTwo"
      className="inputter"
      size="large"
      name="email"
      value={this.state.email}
      onChange={this.onChange}
      type="text"
      autoFocus
      placeholder="Je email adres"
    />
    <Button
      size="large"
      className="loginbtn shadow margbot20"
      disabled={isInvalid}
      onClick={this.onSubmit}>
        aanvragen
        </Button>
        {error && <p>{error.message}</p>}

        </div>
        // <input
        //   name="email"
        //   value={this.state.email}
        //   onChange={this.onChange}
        //   type="text"
        //   placeholder="Email Address"
        // />
        // <button disabled={isInvalid} type="submit">
        //   Reset Mijn Password
        // </button>

    );
  }
}
const PasswordForgetLink = (props) => (
    <div className="textlink" onClick={props.onClick}>Paswoord vergeten?</div>
);

export default PasswordForgetTotal;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };