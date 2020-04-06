import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { Button } from 'antd';

const SignOutButton = ({ firebase }) => {
  const signerOuter = () => {
    firebase.doSignOut();
  }
  return(
  <Button
    size="large"
    onClick={signerOuter}
    className="logoutbtn shadow">
    <Link to={ROUTES.HOME}>
    afmelden
    </Link>
  </Button>
  )
};
export default withFirebase(SignOutButton);