import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
// import {isAuthenticated} from './authentication';

const PrivateAdmin = ({component: Component, user, ...rest}) =>(
    <Route
        {...rest}
        render={props =>
            user && user.rol === 'admin' ? (
                <Component {...props}/>
            ) : (    
               <Redirect to='/' />
            )
        }
    />
); //fede sos god

// PrivateRoute.propTypes = {
//     component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
//     isAuthenticated: PropTypes.bool
// };

// PrivateRoute.defaultProps = {
//     isAuthenticated: false
// };

export default connect(state => ({
    user: state.user
}))(PrivateAdmin);