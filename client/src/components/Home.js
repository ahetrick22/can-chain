import React, { Component } from 'react';
import { drizzleConnect } from 'drizzle-react'
import { AccountData, ContractData } from 'drizzle-react-components';
import { Link } from 'react-router-dom';

class Home extends Component {

  state = {
      username: '',
      password: ''
    }
 
    componentDidMount = () => {
      console.log(this.props);
    }
  
   onPasswordInputChange = password => {
      this.setState({ password })
    }

    onUsernameInputChange = username => {
      this.setState({ username })
    }

    //log in a user (non-Metamask)
    handleLoginClick = () =>  {
      const data = { username: this.state.username, password: this.state.password }
      fetch('/auth/signin', {method: 'POST', headers: {"Content-Type": "application/json"}, mode: "cors", body: JSON.stringify(data)})
        .then(res => res.json()).then(data => localStorage.setItem('token', data.token));
  }

    render() {
        return(
            <>
            <h1>Welcome to CanChain </h1>
             <input type='text' value={this.state.username}
      onChange={event => this.onUsernameInputChange(event.target.value)}></input>               
      <input type='password' value={this.state.password}
      onChange={event => this.onPasswordInputChange(event.target.value)}></input>
             <button onClick={this.handleLoginClick}>Login</button> 
             <br />
             <p>New User? <Link to='/register'>Register now</Link></p>

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


export default drizzleConnect(Home, mapStateToProps);

// <p>The recycling plant for this application is at address: <ContractData contract="BagCount" method="recyclingPlant" /></p>
// Currently logged in as account: <AccountData accountIndex="0" units="ether" precision="3" />