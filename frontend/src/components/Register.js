import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerAccessToken } from '../actions/users';
import { withRouter} from 'react-router-dom';

import apiService from '../actions/index.js';
import RegisterUser from './RegisterUser';

export class Register extends Component {
	constructor (props) {
        super(props);
    };

	render () {
		return (
			<Registration isRegistered={this.props.registered} hasAccessToken={this.props.access} />
		);
	}
}

function Registration(props) {
    	const isRegistered = props.isRegistered;
    	const hasAccessToken = props.hasAccessToken;

    	return <RegisterUser />;
}



function mapStateToProps (state) {
    return {
        registered: state.user.registered,
        access: state.user.access,
        authenticated: state.user.authenticated
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	registerAccessToken: (token) => {
            dispatch(registerAccessToken(token));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));