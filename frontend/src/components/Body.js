import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styles from '../assets/App.css';

export default class Body extends React.Component {
  render() {
    return (
    	<Container>
    		<Row>
    			<Col><div className='container-raised'>{this.props.children}</div></Col>
    		</Row>
    	</Container>
    );
  }
}