import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';

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
      this.props.login(data, () => {
        this.props.history.push('/');
      });
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

export default connect(null, actions)(Home);