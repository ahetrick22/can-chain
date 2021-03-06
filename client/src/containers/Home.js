import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Home extends Component {

  state = {
      username: '',
      password: ''
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
      console.log(this.props);
      this.props.login(data, () => {
        this.props.history.push('/centerdashboard');
      });
  }

    render() {
        return(
            <>
            <h1>Welcome to CanChain </h1>
            <h5>A distributed ledger system for secure, verified data without a need for third-party intervention</h5>
            <label>Username: </label>
             <input type='text' value={this.state.username}
      onChange={event => this.onUsernameInputChange(event.target.value)}></input>   
        <label>Password:</label>            
      <input type='password' value={this.state.password}
      onChange={event => this.onPasswordInputChange(event.target.value)}></input>
             <button onClick={this.handleLoginClick}>Login</button> 
             <br />
             <p>New User? <Link to='/register'>Register now</Link></p>

            </>
        )  
  }
}

export default connect(null, actions)(Home);