import React, { Component } from 'react';
import apiService from '../actions/index.js';
import Body from './Body';
import { Container, Row, Col } from 'reactstrap';
import TransactionItem from './TransactionItem';
import styles from './TransactionItem.css';

export default class RecentTransactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	transactions: null,
    }
  }

  componentDidMount() {
    apiService('transactions', {
      method: 'GET'
    }).then((res) => res.json())
        .then((json) => {
          this.setState({ transactions: json });
        })     
  }

  render() {
    return (
      <div>
      <h4>RecentTransactions.js</h4>
      <div className='transactions-list__wrapper'>
        {
          this.state.transactions && this.state.transactions.map((transaction) => (
            <TransactionItem transaction={transaction}/>
          ))
    	 }
      </div>
      </div>
    );
  }
}