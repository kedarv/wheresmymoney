import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiService from '../actions/index.js';
import { loginFromJWT, registerUser, registerAccessToken } from '../actions/users';
import { withRouter, Link} from 'react-router-dom';
import { setCookie } from '../utils/cookies';
import Body from './Body';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';

export class RegisterUser extends Component {

	constructor (props) {
        super(props);
        this.state = { 
			authError:false,
			errors: null
		};
    }

	handleRegister = (data) => {
    	data.preventDefault();
    	let form = new FormData();
    	form.append('email', data.target.email.value);
    	form.append('password', data.target.password.value);
        form.append('password_confirm', data.target.password_confirm.value); 
    	return apiService('auth/create', {
    		method: 'POST',
    		body: form
    	}).then((res) => res.json())
    		.then((json) => {
    			if (json.access_token) {
    				this.props.registerUser(json.access_token);
                    this.props.history.push('/');                    
    			}
				else{
					this.setState({authError:true, errors:json});
				}
    		})
    }

	render () {
		return (
			<Body>
                <h2 className="section_header">Register</h2>
                <hr/>
                <ErrorMsg authError={this.state.authError} errors={this.state.errors}/>
                <Form onSubmit={this.handleRegister}>
                    <FormGroup>
                        <Label for="inputEmail">Email</Label>
                        <Input type="email" name="email" id="inputEmail" placeholder="user@email.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputPassword">Password</Label>
                        <Input type="password" name="password" id="inputPassword" placeholder="Password" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputPasswordVerify">Verify Password</Label>
                        <Input type="password" name="password_confirm" id="inputPasswordVerify" placeholder="Verify Password" />
                    </FormGroup>
                    <Button type="submit" color="primary">Register</Button>
                </Form>			
                <hr/>
				<Link to="./login">Already have an account?</Link>
			  </Body>
		);
	}
}

function ErrorMsg(props){
	 if(props.authError){
	 	var err = '';
	 	for (var e in props.errors) {
	 		err += props.errors[e] + '\n';
	 	}
        return <Alert color="warning">{err}</Alert>;
	}
	else 
		return <p></p>;
}

function mapStateToProps (state) {
    return {
        registered: state.user.registered,
        access: state.user.access,
        authenticated: state.user.authenticated
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	registerUser: (token) => {
	   dispatch(registerUser(token));
	},
	onRegisterAccess() {
		dispatch(registerAccessToken());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterUser));