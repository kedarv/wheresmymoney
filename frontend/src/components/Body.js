import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export default class Body extends React.Component {
  render() {
    return (
    	<Container>
    		<Row>
    			<Col>{this.props.children}</Col>
    		</Row>
    	</Container>
    );
  }
}