import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Register extends Component {

  constructor(props, context) {

    super(props);

    this.state = {
      centerName: '',
      city: '',
      state: 'NY',
      contactName: '',
      username: '',
      password: '',
      verifyPassword: '',
      accountAddress: this.props.accounts[0]
    }
    this.contracts = context.drizzle.contracts;
  }

  validateVerifiedPassword = () => {
    return this.state.password === this.state.verifyPassword;
  }

     onCenterNameChange = centerName => {
      this.setState({ centerName })
    }

    onCityChange = city => {
      this.setState({ city })
    }
    onStateChange = state => {
      this.setState({ state })
    }

    onContactNameChange = contactName => {
      this.setState({ contactName })
    }

    onUsernameChange = username => {
      this.setState({ username })
    }
  
   onPasswordChange = password => {
      this.setState({ password })
    }

    onVerifyPasswordChange = verifyPassword => {
      this.setState({ verifyPassword })
    }

    //log in a user (non-Metamask)
    handleSignUpClick = () =>  {
      //verify that same password was entered twice
      console.log(this.contracts);
      //console.log(this.state);
      //const data = { username: this.state.username, password: this.state.password }
      // fetch('/auth/signin', {method: 'POST', headers: {"Content-Type": "application/json"}, mode: "cors", body: JSON.stringify(data)})
      //   .then(res => res.json()).then(data => localStorage.setItem('token', data.token));
  }

    render() {
        return(
            <>
            <h1>Create New Account </h1>
             <label>Center Name</label>
             <input type='text' value={this.state.centerName}
      onChange={event => this.onCenterNameChange(event.target.value)}></input>               
              <label>City</label>
              <input type='text' value={this.state.username}
      onChange={event => this.onCityInputChange(event.target.value)}></input>
              <label>State</label>
              <input type='text' value={this.state.state}
      onChange={event => this.onStateChange(event.target.value)}></input>
                    <label>Contact Full Name</label>
              <input type='text' value={this.state.contactName}
      onChange={event => this.onContactNameChange(event.target.value)}></input> 
                    <label>Username</label>
              <input type='text' value={this.state.username}
      onChange={event => this.onUsernameChange(event.target.value)}></input>
                    <label>Account Address (from Metamask login)</label>
              <input type='text' readOnly={true} value={this.state.accountAddress}></input>     
              <label>Password</label>
              <input type='password' value={this.state.password}
      onChange={event => this.onPasswordChange(event.target.value)}></input>
    <label>Verify Password</label>
     <input type='password' value={this.state.verifyPassword}
      onChange={event => this.onVerifyPasswordChange(event.target.value)}></input>
             <button onClick={this.handleSignUpClick}>Register Account</button> 
             <br />
            </>
        )  
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    contracts: state.contracts
  }
}

Register.contextTypes = {
  drizzle: PropTypes.object
}


export default drizzleConnect(Register, mapStateToProps);

