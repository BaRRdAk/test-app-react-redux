import React from 'react'
import { connect } from 'react-redux'

import request from 'then-request'

import { Redirect } from 'react-router'

class Dashboard extends React.Component {

  constructor(props) {
    super(props)
  }


  componentDidMount() {

      const queryString = require('query-string');
      const parsed = queryString.parse(this.props.location.hash);
      if(parsed['access_token']){
        sessionStorage.setItem('access_token', parsed['access_token']);
        this.props.router.push('/dashboard');
      }

  }


  render() {

    let buttonName = 'Authorize';

     this.props.checkAuthorized();

    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={this.props.onAuthorize} >{buttonName}</button>
      </div>
    )
  }
}

export default connect(
  state => ({
    localState: state
  }),
  dispatch => ({
    onAuthorize: () => {

      let scopes = ["esi-wallet.read_character_wallet.v1", "esi-assets.read_assets.v1", "esi-industry.read_character_jobs.v1", "esi-characters.read_blueprints.v1", "esi-markets.read_character_orders.v1"];

      let client_id = "9e867eac9a4e465a9166e801dd5d5e0f";
      let authorize_url = "https://login.eveonline.com/oauth/authorize?response_type=token&redirect_uri=http%3A%2F%2Flocalhost:2200%2F%23%2Fdashboard/&realm=ESI&client_id=" + client_id + "&scope=" + scopes.join("%20") + "&state=evesso";
      location.href = authorize_url;
    },
    onLogout: () => {
      sessionStorage.removeItem('access_token');
    },
    checkAuthorized: () => {
      if(sessionStorage.getItem('access_token')){
        let token = sessionStorage.getItem('access_token');
        let url="https://esi.tech.ccp.is/latest/characters/96732334/wallet/?datasource=tranquility&token=" + token;

        request('GET', url, {json: true}).done((result) => {
          if(result.statusCode == 200){
            let resArray = JSON.parse(result.getBody())
            console.log('RESULT', resArray)
          } else {
            sessionStorage.removeItem('access_token');
          }
        })
      }

    }
  })
)(Dashboard);
