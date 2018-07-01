import React, { Component } from 'react';
import styles from './TransactionItem.css';
import index from '../index.css';

function getAmount(inflow, outflow) {
    if(inflow) {
        return [inflow, "positive", ""];
    }
    return [outflow, "negative", "-"];
}

export default class TransactionItem extends React.Component {
  render() {
    const attrs = getAmount(this.props.transaction.inflow, this.props.transaction.outflow);
    return (
    	<div className='transaction-item'>
    		<div class="transaction-item__date">{this.props.transaction.date}</div>
            <div class="transaction-item__info">{this.props.transaction.payee.name}</div>
            <div class="transaction-item__amount"><span className={attrs[1] + " money"}>{attrs[2]}${attrs[0].toFixed(2)}</span></div>
    	</div>
    );
  }
}