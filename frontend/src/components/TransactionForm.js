import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiService from '../actions/index.js';
import { withRouter } from 'react-router-dom';
import { InputGroup, InputGroupAddon, Button, Form, FormGroup, Label, Input, Alert, Row, Col } from 'reactstrap';
import CreatableSelect from 'react-select/lib/Creatable';
import Select from 'react-select';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import '../formstyle.css';

const createOption = (label: string, value) => ({
  label,
  value: value.toString(),
});

export class TransactionForm extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      errors: null,
      isLoadingPayee: false,
      isLoadingCategory: false,
      payees: null,
      categories: null,
      accounts: null,
      date: undefined,
    };
  }

  componentDidMount() {
    let d = new Date();
    apiService('payee', {
      method: 'GET'
    }).then((res) => res.json())
        .then((json) => {
          this.setState({ payees: this.populateOptions(json) });
        })
    apiService('category/current/' + (d.getMonth()+1) + '/' + d.getFullYear(), {
      method: 'GET'
    }).then((res) => res.json())
        .then((json) => {
          this.setState({ categories: this.populateOptions(json) });
        })
    apiService('account', {
      method: 'GET'
    }).then((res) => res.json())
        .then((json) => {
          this.setState({ accounts: this.populateOptions(json) });
        })        
  }

  handleCreatePayee = (inputValue: any) => {
    this.setState({ isLoadingPayee: true });
    let form = new FormData();
    form.append('name', inputValue); 
    return apiService('payee/create', {
      method: 'POST',
      body: form
    }).then((res) => res.json())
      .then((json) => {
        const newOption = createOption(inputValue, json.id);
        this.setState({
          isLoadingPayee: false,
          payees: [...this.state.payees, newOption],
          payee_value: newOption,
        });  
      })
  };

  handleCreateCategory = (inputValue: any) => {
    this.setState({ isLoadingCategory: true });
    let form = new FormData();
    form.append('name', inputValue);
    form.append('amount', 0);
    return apiService('category/create', {
      method: 'POST',
      body: form
    }).then((res) => res.json())
      .then((json) => {
        const { options } = this.state;
        const newOption = createOption(inputValue, json.id);
        this.setState({
          isLoadingCategory: false,
          categories: [...this.state.categories, newOption],
          category_value: newOption,
        });  
      })
  };

  handleCreateTransaction = (data) => {
    data.preventDefault();
    let form = new FormData();
    form.append('payee_id', data.target.payee.value);
    form.append('category_id', data.target.category.value);
    form.append('account_id', data.target.account.value);
    form.append('amount', data.target.amount.value.replace(/\$/g, ''));
    form.append('memo', data.target.memo.value);
    form.append('date', this.state.date);
    return apiService('transactions/create', {
      method: 'POST',
      body: form
    }).then((res) => res.json())
        .then((json) => {
          this.setState({errors:json});
        })
  }

  populateOptions(options) {
    return options.map((option) => (
      createOption(option.name, option.id)
    ));
  }

  render () {
    return (
      <div>
      <h4>TransactionForm.js</h4>
        <ErrorMsg errors={this.state.errors}/>
          <Form onSubmit={this.handleCreateTransaction}>
            <Row>
              <Col md={3}>
                <FormGroup>
                  <Label for="inputDate">Date</Label>
                  <DayPickerInput modifiersStyles='form-control' onDayChange={day => this.state.date = day.toLocaleDateString()}/>
                </FormGroup>
              </Col>
              <Col md={9}>
                <FormGroup>
                  <Label for="inputPayee">Payee</Label>
                  {this.state.payees === null ? <div>Loading</div> :  
                    <CreatableSelect
                      name="payee"
                      id="inputPayee"
                      isClearable
                      isDisabled={this.state.isLoadingPayee}
                      isLoading={this.state.isLoadingPayee}
                      onCreateOption={this.handleCreatePayee}
                      options={this.state.payees}
                      placeholder="Select or create Payee"
                      value={this.state.payee_value}
                    />
                  }
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
            <FormGroup>
              <Label for="inputCategory">Category</Label>
                {this.state.categories === null ? <div>Loading</div> :  
                  <CreatableSelect
                    name="category"
                    id="inputCategory"
                    isClearable={false}
                    isDisabled={this.state.isLoadingCategory}
                    isLoading={this.state.isLoadingCategory}
                    onCreateOption={this.handleCreateCategory}
                    options={this.state.categories}
                    value={this.state.category_value}
                  />
                }
              </FormGroup>
              </Col>
              <Col md={6}>            
              <FormGroup>
              <Label for="inputCategory">Account</Label>
                {this.state.accounts === null ? <div>Loading</div> :  
                  <Select
                    name="account"
                    options={this.state.accounts}
                    placeholder="Select Account"
                  />
                }
              </FormGroup>
              </Col>
              </Row>
              <Row>
                <Col md={6}>
                <FormGroup>
                  <Label for="inputAmount">Amount</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                    <Input type="text" name="amount" id="inputAmount" placeholder="5" />
                  </InputGroup>                    
                </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                  <Label for="inputMemo">Input Memo</Label>
                  <Input type="text" name="memo" id="inputMemo" placeholder="Memo" />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TransactionForm));