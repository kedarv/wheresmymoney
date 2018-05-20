import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiService from '../actions/index.js';
import { withRouter, Link} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
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
    apiService('payee', {
      method: 'GET'
    }).then((res) => res.json())
        .then((json) => {
          this.setState({ payees: this.populateOptions(json) });
          console.log(this.state.payees);
        })
    apiService('category', {
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
        const { options } = this.state;
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
    form.append('outflow', data.target.outflow.value);
    form.append('inflow', data.target.inflow.value);
    form.append('date', this.state.date);

        return apiService('transactions/create', {
            method: 'POST',
            body: form
        }).then((res) => res.json())
            .then((json) => {
               console.log(json)
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
        <ErrorMsg authError={this.state.authError} errors={this.state.errors}/>
          <Form onSubmit={this.handleCreateTransaction}>
            <FormGroup>
              <Label for="inputDate">Date</Label>
              <DayPickerInput modifiersStyles='form-control' onDayChange={day => this.state.date = day.toLocaleDateString()}/>
            </FormGroup>
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
                    value={this.state.payee_value}
                  />
                }
              </FormGroup>
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
              <FormGroup>
              <Label for="inputCategory">Account</Label>
                {this.state.accounts === null ? <div>Loading</div> :  
                  <Select
                    name="account"
                    options={this.state.accounts}
                  />
                }
              </FormGroup>              
              <FormGroup>
                <Label for="inputOutflow">Outflow</Label>
                <Input type="text" name="outflow" id="inputOutflow" placeholder="outflow" />
              </FormGroup>
              <FormGroup>
                <Label for="inputInflow">Inflow</Label>
                <Input type="text" name="inflow" id="inputInflow" placeholder="inflow" />
              </FormGroup>
              <Button type="submit" color="primary">Save</Button>
          </Form>         
      </div>
    );
  }
}

function ErrorMsg(props){
     if(props.authError){
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