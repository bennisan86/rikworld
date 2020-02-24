import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => {
  const signerOuter = () => {
    firebase.doSignOut();
  }
  return(
  <button type="button" onClick={signerOuter}>
    <Link to={ROUTES.HOME}>
    Sign Out
    </Link>
  </button>
  )
};
export default withFirebase(SignOutButton);