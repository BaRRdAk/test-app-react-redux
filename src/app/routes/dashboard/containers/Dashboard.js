import React from 'react'
import { connect } from 'react-redux'

import request from 'then-request'

class Dashboard extends React.Component {

  constructor(props) {
    super(props)

  }


  componentDidMount() {

    if(this.props.location.query.code != undefined){
      console.log('code', this.props.location.query.code);

      var client_id = "9e867eac9a4e465a9166e801dd5d5e0f";
      var secret_key = "p6ImDKs7cGDMglXxTooTtLBLPoKCDymRaKazOxbf";
      var code = this.props.location.query.code;
      var params = "grant_type=authorization_code&code=" + code;
      var path="https://login.eveonline.com/oauth/token";
      var authorization_string = client_id + ":" + secret_key;
      var authorization_header = "Basic " + btoa(authorization_string);

      console.log('authorization_header', authorization_header);

      var request = new XMLHttpRequest();
      request.onreadystatechange=this.state_change;
      request.open("POST", path, true);
      request.setRequestHeader("Authorization", authorization_header);
      request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      //request.setRequestHeader("Host", "login.eveonline.com");

      request.send(params);
    }

  }

  state_change(){
  	if (request.readyState==4){
  		if (request.status==200){

  			var serverResponse = JSON.parse(request.responseText);

        console.log('AuthorizedResponse', serverResponse);

  		} else {

  			alert("Problem retrieving XML data");

  		}
  	}
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <button onClick={this.props.onAuthorize} >Authorize</button>
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

      var scopes = ["characterWalletRead", "characterAssetsRead", "characterIndustryJobsRead", "characterMarketOrdersRead", "characterResearchRead"];

      var client_id = "9e867eac9a4e465a9166e801dd5d5e0f";
      var authorize_url = "https://login.eveonline.com/oauth/authorize/?response_type=code&redirect_uri=http://localhost:2200%2F%23%2Fdashboard/&client_id=" + client_id + "&scope=" + scopes.join("%20") + "&state=myappstate";
      location.href = authorize_url;
    }
  })
)(Dashboard);
