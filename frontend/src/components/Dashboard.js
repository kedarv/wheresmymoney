import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiService from '../actions/index.js';
import { logoutUser } from '../actions/users';
import Body from './Body';
import TransactionForm from './TransactionForm';
import { Table } from 'reactstrap';

export class Dashboard extends Component {

	constructor (props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true });
    	apiService('user/dashboard', {
            method: 'GET'
        }).then((res) => res.json())
            .then((json) => {
                let accounts = json.accounts.map(account => 
                    <div key={account.id}><b>{account.name}</b>  ${account.balance}</div>
                )
                this.setState({ accounts:accounts, isLoading: false, 'net_worth': json.net_worth });
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
                <h2>Dashboard</h2>
                <hr/>
                Net Worth: {this.state.net_worth}<br/>
                <b>Accounts</b><br/>
                {this.state.accounts}
                <TransactionForm/>
                <hr/>
                <a href="#" onClick={this.handleLogout}>logout</a>
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
