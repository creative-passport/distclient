import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  CognitoState,
  NewPasswordRequired,
  EmailVerification,
} from 'react-cognito'

import LoginPage from './LoginPage'
import EmailVerificationForm from './EmailVerificationForm';
import NewPasswordRequiredForm from './NewPasswordRequiredForm';
import AllProfiles from './AllProfiles'
import ConfirmPage from './ConfirmPage'

import Layout from './Layout'

const loggedInProfile = (user, attributes) => (
  <AllProfiles/>
);

const loggedOutPage = () => (
  <LoginPage/>
);

const confirmForm = () => (
  <ConfirmPage/>
)

const newPasswordPage = () => (
  <Layout>
    <div>
      <p>New password required, since this is your first login</p>
      <NewPasswordRequired>
        <NewPasswordRequiredForm />
      </NewPasswordRequired>
    </div>
  </Layout>
);

const emailVerificationPage = () => (
  <Layout>
    <div>
      <p>You must verify your email address.  Please check your email for a code</p>
      <EmailVerification>
        <EmailVerificationForm />
      </EmailVerification>
    </div>
  </Layout>
)

const mfaPage = () => (
  <div>
    <p>You need to enter an MFA, but this library does not yet support them.</p>
  </div>
)

const BaseDashboard = ({ state, user, attributes }) => {
  switch (state) {
    case CognitoState.LOGGED_IN:
      return loggedInProfile()

    case CognitoState.AUTHENTICATED:
    case CognitoState.LOGGING_IN:
      return (
        <div>
          <img src="ajax-loader.gif" alt="" />
        </div>
        )
    case CognitoState.LOGGED_OUT:
    case CognitoState.LOGIN_FAILURE:
      return loggedOutPage();
    case CognitoState.MFA_REQUIRED:
      return mfaPage();
    case CognitoState.NEW_PASSWORD_REQUIRED:
      return newPasswordPage();
    case CognitoState.EMAIL_VERIFICATION_REQUIRED:
      return emailVerificationPage();
    case CognitoState.CONFIRMATION_REQUIRED:
      return confirmForm();
    default:
      return (
        <div>
          <p>Unrecognised cognito state</p>
        </div>
      );
  }
};

BaseDashboard.propTypes = {
  user: PropTypes.object,
  attributes: PropTypes.object,
  state: PropTypes.string,
};

const mapStateToProps = state => ({
  state: state.cognito.state,
  user: state.cognito.user,
  attributes: state.cognito.attributes,
});

const Dashboard = connect(mapStateToProps, null)(BaseDashboard);

export default Dashboard;
