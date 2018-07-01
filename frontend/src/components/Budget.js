import React, { Component } from 'react';
import apiService from '../actions/index.js';
import Body from './Body';
import { Container, Row, Col } from 'reactstrap';

export default class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	categories: null,
    }
  }

  componentDidMount() {
    let d = new Date();
    apiService('category/calculated/' + (d.getMonth()+1) + '/' + d.getFullYear(), {
      method: 'GET'
    }).then((res) => res.json())
        .then((json) => {
          this.setState({ categories: json });
        })     
  }

  render() {
    return (
      <div>
        {
          this.state.categories && this.state.categories.map((category) => (
            <div>{category.name + ' has $' + category.remaining_calculated.toFixed(2) + ' left'}</div>
          ))
    	 }
      </div>
    );
  }
}