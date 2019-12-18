import React from 'react'
import PropTypes from 'prop-types'
import { Action } from '../actions/authenticationActions'
import store from '../reducers/store'

/**
 * Container for logout behaviour.
 * @example
 * <Logout onLogout={handler}>
 *   <LogoutForm />
 * </Logout>
 */
export class Logout extends React.Component {

    constructor(props) {
        this.onClick = this.onClick.bind(this)      
    }

    /**
    * Passed to child element as onClick prop.
    * Signs the user out, and then dispatches the logout action
    * If you want to take further actions (like reloading UI) then add an
    * onLogout property to the Logout element
    */
    onClick = (event) => {
        const { store } = this.context;
        const state = store.getState();
        state.cognito.user.signOut();
        event.preventDefault();
        store.dispatch(Action.logout());
        this.props.onLogout();
    }

    /**
    * renders the child element, adding an onClick property
    */
    render() {
        return React.cloneElement(this.props.children, {
          onClick: this.onClick,
        });
    }
}

Logout.contextTypes = {
  store: PropTypes.object,
};
Logout.propTypes = {
  children: PropTypes.any.isRequired,
  onLogout: PropTypes.func,
};
Logout.defaultProps = {
  onLogout: () => {},
};

const LogoutButton = ({ onClick }) => (
  // <button onClick={onClick}>Log out</button>
  <button onClick={(e) => {
        // const { store } = this.context;
        const state = store.getState();
        state.cognito.user.signOut();
        e.preventDefault();
        store.dispatch(Action.logout());
        // this.props.onLogout()
    }}> Log out </button>
);

LogoutButton.propTypes = {
  onClick: PropTypes.func,
};

export default LogoutButton;
