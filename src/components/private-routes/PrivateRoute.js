import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const PrivateRoute = ({ component: Component, users: { isAuthenticated, loading }, ...rest }) => (
   <Route  {...rest} render={props =>
      !isAuthenticated && !loading ?
         (<Redirect to="/login" />) :
         (<Component {...props} />)}
   />
);

PrivateRoute.propTypes = {
   users : PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
   users : state.users
})

export default connect(mapStateToProps)(PrivateRoute)