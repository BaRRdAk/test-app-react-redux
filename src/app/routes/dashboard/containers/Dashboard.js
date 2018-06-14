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

        let verifyURL="https://esi.evetech.net/verify/?datasource=tranquility&token=" + sessionStorage.getItem('access_token');

        request('GET', verifyURL, {json: true}).done((result) => {
          if(result.statusCode == 200){
            let resArray = JSON.parse(result.getBody())
            sessionStorage.setItem('CharacterID', resArray.CharacterID);
            sessionStorage.setItem('CharacterName', resArray.CharacterName);
          }
        })

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
        <div>{sessionStorage.getItem('CharacterName')}</div>
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

      let scopes = ["esi-wallet.read_character_wallet.v1", "esi-assets.read_assets.v1", "esi-industry.read_character_jobs.v1", "esi-characters.read_blueprints.v1", "esi-markets.read_character_orders.v1", "esi-planets.manage_planets.v1"];

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
        let characterID = sessionStorage.getItem('CharacterID');


        let walletURL="https://esi.tech.ccp.is/latest/characters/" + characterID + "/wallet/?datasource=tranquility&token=" + token;

        request('GET', walletURL, {json: true}).done((result) => {
          if(result.statusCode == 200){
            let wallet = JSON.parse(result.getBody())
          } else {
            sessionStorage.removeItem('access_token');
          }
        })


        let ordersURL="https://esi.tech.ccp.is/latest/characters/" + characterID + "/orders/?datasource=tranquility&token=" + token;

        request('GET', ordersURL, {json: true}).done((result) => {
          if(result.statusCode == 200){
            let ordersArray = JSON.parse(result.getBody())
            console.log('ORDERS', ordersArray)
          } else {
            sessionStorage.removeItem('access_token');
          }
        })

        let jobsURL="https://esi.tech.ccp.is/latest/characters/" + characterID + "/industry/jobs/?datasource=tranquility&token=" + token;

        request('GET', jobsURL, {json: true}).done((result) => {
          if(result.statusCode == 200){
            let jobsArray = JSON.parse(result.getBody())
            console.log('JOBS', jobsArray)
          } else {
            sessionStorage.removeItem('access_token');
          }
        })



      }

    }
  })
)(Dashboard);
