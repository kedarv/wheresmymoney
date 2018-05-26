import React, { Component } from 'react';
import apiService from '../actions/index.js';
import Body from './Body';
import TransactionForm from './TransactionForm';
import { Container, Row, Col, Table, Button, ListGroup, ListGroupItem } from 'reactstrap';

export default class Dashboard extends Component {

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
                    <ListGroupItem className="justify-content-between clearfix" key={account.id}>
                        <b className="float-left">{account.name}</b>
                        <span className="money positive float-right">${account.balance}</span>
                    </ListGroupItem>
                )
                this.setState({ accounts:accounts, isLoading: false, 'net_worth': json.net_worth });
        })
    }

    render () {
        return (
            <Body>
                <Container>
                    <Row>
                        <Col lg="4" sm="12" className="mb-4">
                            <Row>
                                <Col xs="6"><span className="section_header">Net Worth:</span></Col>
                                <Col xs="6"><div className="text-right money positive header">${this.state.net_worth}</div></Col>
                            </Row>
                            <hr/>
                            <ListGroup>
                            {this.state.accounts}
                            </ListGroup>
                        </Col>
                        <Col lg="8" sm="12">
                            <span className="section_header">New Transaction</span>
                            <hr/>
                            <TransactionForm/>
                        </Col>
                    </Row>
                </Container>
            </Body>
        );
    }
}