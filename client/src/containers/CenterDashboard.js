import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import PropTypes from 'prop-types';

class CenterDashboard extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      user: null,
      count: 0
    }
    this.contracts = context.drizzle.contracts;
  }

  componentDidMount = () => {
    const config = {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    };
    fetch('/currentuser',
      config
    )
    .then(res => res.json())
      .then(data => {
        this.setState({ user: data })
      })
    .catch(error => {
      console.log(error);
    });  
  }

  createDelivery = () => {
    const deliveryInfo = {
      centerId: this.state.user.id,
      dateTime: Date.now()
    }
    console.log(deliveryInfo);

    const stackId = this.contracts.BagCount.methods.recordCount.cacheSend(this.state.count,deliveryInfo.dateTime)
  
    fetch('/delivery', {
      method: 'POST',
      mode: 'cors',
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify(deliveryInfo)     
    }).then(res => res.json())
      .then(data => {
        console.log(data);
      })

  }

  viewPreviousDelivery = () => {

  }

  seeReconciliations = () => {

  }

  render() {
    return(
   //   if(!authenticated) then redirect
        <>
          <DashboardHeader history={this.props.history}/>
          <button onClick={this.createDelivery}> Create a Delivery </button>
          <button onClick={this.viewPreviousDelivery}> View Previous Deliveries </button>
          <button onClick={this.seeReconciliations}> See Reconciliations </button>

        </>
    )
  }
}

CenterDashboard.contextTypes = {
  drizzle: PropTypes.object
}

export default connect(null, actions)(CenterDashboard);
