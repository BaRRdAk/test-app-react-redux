import React from 'react'
import { connect } from 'react-redux'

import request from 'then-request'

import { Redirect } from 'react-router'

import { getCharacter } from '../action/getCharacter'
import CharacterInfo from '../../../components/character/CharacterInfo'

class Dashboard extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

      const queryString = require('query-string');
      const parsed = queryString.parse(this.props.location.hash);
      if(parsed['access_token']){
        sessionStorage.setItem('access_token', parsed['access_token'])
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


  verify() {

  }

  render() {

    let buttonName = 'Authorize';
    let infoButton;
    let action = null

    if (sessionStorage.getItem('CharacterName')) {
      buttonName = 'Logout';
      infoButton = <button onClick={this.props.onShowInfo} >{sessionStorage.getItem('CharacterName')}</button>;
      action = this.props.onLogout
    } else {
      buttonName = 'Authorize';
      infoButton = "";
      action = this.props.onAuthorize
    }

    return (
      <div className="container">

        <button onClick={action} >{buttonName}</button>

        {infoButton}

        <CharacterInfo data={this.props.localState.characterStore} />

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
      sessionStorage.removeItem('CharacterID');
      sessionStorage.removeItem('CharacterName');
    },
    onShowInfo: () => {
      let token = sessionStorage.getItem('access_token');
      let characterID = sessionStorage.getItem('CharacterID');
      dispatch(getCharacter(token, characterID))
    },

  })
)(Dashboard);
