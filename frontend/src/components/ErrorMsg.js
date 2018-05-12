import React, { Component } from 'react';
import { Alert } from 'reactstrap';

export default class ErrorMsg extends React.Component {
  render() {
    return (
    	<Alert>{this.props.authError}</Alert>
    );
  }
}