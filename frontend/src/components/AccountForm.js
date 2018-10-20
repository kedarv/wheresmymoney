import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiService from '../actions/index.js';
import { withRouter } from 'react-router-dom';
import { InputGroup, InputGroupAddon, Button, Form, FormGroup, Label, Input, Alert, Row, Col } from 'reactstrap';
import '../formstyle.css';

const createOption = (label: string, value) => ({
  label,
  value: value.toString(),
});

export class AccountForm extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      errors: null,
      isLoadingAccounts: false,
    };
  }

  handleCreateAccount = (data) => {
    data.preventDefault();
    let form = new FormData();
    form.append('name', data.target.name.value);
    form.append('balance', data.target.balance.value.replace(/\$/g, ''));
    return apiService('account/create', {
      method: 'POST',
      body: form
    }).then((res) => res.json())
        .then((json) => {
          this.setState({errors:json});
        })
  }

  render () {
    return (
      <div>
        <h4>AccountForm.js</h4>
        <ErrorMsg errors={this.state.errors}/>
          <Form onSubmit={this.handleCreateAccount}>
              <Row>
                <Col md={6}>
                <FormGroup>
                  <Label for="inputAccountName">Account Name</Label>
                  <Input type="text" name="name" id="inputAccountName" placeholder="Checking" />
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                  <Label for="inputCurrentBalance">Current Balance</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input type="text" name="balance" id="inputCurrentBalance" placeholder="100" />
                  </InputGroup>                  
                </FormGroup>
                </Col>
              </Row>
   
                  <Button type="submit" color="primary">Save</Button>
              

          </Form>         
      </div>
    );
  }
}

function ErrorMsg(props){
     if(props.errors){
        var err = '';
        for (var e in props.errors) {
            err += props.errors[e] + '\n';
        }
        return <Alert color="warning">{err}</Alert>;
    }
    else 
        return <p></p>;
}

function mapStateToProps (state) {
    return {
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AccountForm));