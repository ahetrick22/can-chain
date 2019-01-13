import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import DashboardHeader from './DashboardHeader';
import PropTypes from 'prop-types';

class PlantDashboard extends Component {
  constructor(props, context) {
    super(props);

    this.contracts = context.drizzle.contracts;
  }

  verifyLatestDeliveries = () => {
    console.log('verifying');
  }

  reconcileDiscrepancies = () => {
    console.log('reconciling');
  }

  render() {
    return(
   //   if(!authenticated) then redirect
        <>
          <DashboardHeader history={this.props.history}/>
          <button onClick={this.verifyLatestDeliveries}>Verify Latest Deliveries</button>
          <button onClick={this.reconcileDiscrepancies}>View and Reconcile Discrepancies</button>
        </>
    )
  }
}

PlantDashboard.contextTypes = {
  drizzle: PropTypes.object
}

export default connect(null, actions)(PlantDashboard);
