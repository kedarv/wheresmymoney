import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginFromJWT, registerAccessToken } from '../actions/users';
import apiService from '../actions/index.js';
import { withRouter, Link} from 'react-router-dom';
import '../assets/App.css';
import Body from './Body';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';

export class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            redirectToReferrer: false,
            authError:false,
            errors: null
        };
    }

    handleLogin = (data) => {
        data.preventDefault();
        let form = new FormData();
        form.append('email', data.target.email.value);
        form.append('password', data.target.password.value);
        return apiService('auth/login', {
            method: 'POST',
            body: form
        }).then((res) => res.json())
            .then((json) => {
                if (json.access_token) {
                    this.props.onLogin(json.access_token);
                    this.props.history.push('/');
                } else {
                        this.setState({authError:true, errors:json});
                    }
            })
    }

    render () {
        return (
            <Body>
                <h2>Login</h2>
                <hr/>            
                <ErrorMsg authError={this.state.authError} errors={this.state.errors}/>
                <Form onSubmit={this.handleLogin}>
                    <FormGroup>
                        <Label for="inputEmail">Email</Label>
                        <Input type="email" name="email" id="inputEmail" placeholder="user@email.com" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="inputPassword">Password</Label>
                        <Input type="password" name="password" id="inputPassword" placeholder="Password" />
                    </FormGroup>
                    <Button type="submit" color="primary">Login</Button>
                </Form>
                <hr/>
                <Link to="./register">Don't have an account yet?</Link>
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
        authenticated: state.user.authenticated,
        access: state.user.access
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onLogin: (token) => {
        dispatch(loginFromJWT(token));
    },
    onRegisterAccess() {
        dispatch(registerAccessToken());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
