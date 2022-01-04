import React, { Component } from 'react';
import metamaskLogo from '../metamask.png';
import {Link} from 'react-router-dom'

class MetamaskAlertScreen extends Component {

  render() {
    return (
      <div className="my-5 text-center">
        <img src={metamaskLogo} width="250" class="mb-4" alt=""/>
        <h1>Please Install Metamask</h1>
        For more information please <Link to="/help">Click Here</Link>
      </div>
    );
  }
}

export default MetamaskAlertScreen;