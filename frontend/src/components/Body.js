import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import styles from '../assets/App.css';
import BodyNav from './BodyNav';

export default class Body extends React.Component {
  render() {
    return (
    	<div>
    		<BodyNav/>
    		<Container>
    			<Row>
    				<Col><div className='container-raised'>{this.props.children}</div></Col>
    			</Row>
    		</Container>
    	</div>
    );
  }
}