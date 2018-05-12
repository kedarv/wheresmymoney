import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';
import FontAwesome from 'react-fontawesome';
import Body from './Body';

export class Dashboard extends Component {

	constructor (props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
    	apiService('account', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                let accounts = json.map(account => 
                    <div key={account.id}><b>{account.name}</b>  ${account.balance}</div>
                )
                this.setState({ accounts:accounts, isLoading: false });
        })

    }

	handleLogout = (e) => {
		e.preventDefault();
		this.props.logoutUser();
		this.props.history.push('/login');
	}

	

    render () {
        return (
            <Body>
            <div style={{height: '100%'}}>
            we're authed!
           {this.state.accounts}
           <hr/>
                        <li><a href="./dashboard/settings">link to something</a></li>
                        <li><a href="#" onClick={this.handleLogout}>logout</a></li>

            </div>
            </Body>
        );
    }
}

function mapStateToProps (state) {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	logoutUser: () => {
	        dispatch(logoutUser());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
