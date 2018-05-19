import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiService from '../actions/index.js';
import { withRouter, Link} from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import CreatableSelect from 'react-select/lib/Creatable';

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

const defaultOptions = [
  createOption('One'),
  createOption('Two'),
  createOption('Three'),
];

export class TransactionForm extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      errors: null,
      isLoading: false,
      payees: null,
      value: undefined,
    };
  }

  componentDidMount() {
    apiService('payee', {
      method: 'GET'
    }).then((res) => res.json())
        .then((json) => {
          this.setState({ payees: this.populateOptions(json) });
        })
  }

  handleChange = (newValue: any, actionMeta: any) => {
    this.setState({ value: newValue });
  };

  handleCreate = (inputValue: any) => {
    this.setState({ isLoading: true });
    let form = new FormData();
    form.append('name', inputValue); 
    return apiService('payee/create', {
      method: 'POST',
      body: form
    }).then((res) => res.json())
      .then((json) => {
        const { options } = this.state;
        const newOption = createOption(inputValue);
        this.setState({
          isLoading: false,
          payees: [...this.state.payees, newOption],
          value: newOption,
        });  
      })
  };

  handleCreateTransaction = (data) => {
    data.preventDefault();
    let form = new FormData();
        // form.append('email', data.target.email.value);
        // form.append('password', data.target.password.value); 
        // return apiService('auth/create', {
        //     method: 'POST',
        //     body: form
        // }).then((res) => res.json())
        //     .then((json) => {
        //         if (json.access_token == 'success') {
        //             this.props.registerUser(json.access_token);
        //         }
        //         else{
        //             this.setState({authError:true, errors:json});
        //         }
        //     })
  }

  populateOptions(options) {
    return options.map((option) => (
      createOption(option.name)
    ));
  }

  render () {
    return (
      <div>
        <ErrorMsg authError={this.state.authError} errors={this.state.errors}/>
          <Form onSubmit={this.handleRegister}>
            <FormGroup>
              <Label for="inputEmail">Payee</Label>
                {this.state.payees === null ? <div>Loading</div> :  
                  <CreatableSelect
                    isClearable
                    isDisabled={this.state.isLoading}
                    isLoading={this.state.isLoading}
                    onChange={this.handleChange}
                    onCreateOption={this.handleCreate}
                    options={this.state.payees}
                    value={this.state.value}
                  />
                }
              </FormGroup>
              <FormGroup>
                <Label for="inputPassword">Outflow</Label>
                <Input type="password" name="password" id="inputPassword" placeholder="outflow" />
              </FormGroup>
              <FormGroup>
                <Label for="inputPasswordVerify">Inflow</Label>
                <Input type="password" name="password-verify" id="inputPasswordVerify" placeholder="inflow" />
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