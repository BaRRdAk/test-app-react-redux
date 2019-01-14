import request from 'then-request'

export const getCharacter = (token, characterID) => dispatch => {

  console.log(sessionStorage.getItem('CharacterName'));

  let walletURL = "https://esi.evetech.net/latest/characters/" + characterID +
    "/wallet/?datasource=tranquility&token=" + token;

  request('GET', walletURL, {
    json: true
  }).done((result) => {
    if (result.statusCode == 200) {
      let wallet = JSON.parse(result.getBody())
      dispatch({
        type: 'SHOW_CHARACTER_WALLET',
        payload: wallet
      })
    } else {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('CharacterID');
      sessionStorage.removeItem('CharacterName');
    }
  })

  let ordersURL = "https://esi.evetech.net/latest/characters/" + characterID +
    "/orders/?datasource=tranquility&token=" + token;

  request('GET', ordersURL, {
    json: true
  }).done((result) => {
    if (result.statusCode == 200) {
      let ordersArray = JSON.parse(result.getBody())
      dispatch({
        type: 'SHOW_CHARACTER_ORDERS',
        payload: ordersArray
      })
    }
  })

  let jobsURL = "https://esi.evetech.net/latest/characters/" + characterID +
    "/industry/jobs/?datasource=tranquility&token=" + token;

  request('GET', jobsURL, {
    json: true
  }).done((result) => {
    if (result.statusCode == 200) {
      let jobsArray = JSON.parse(result.getBody())
      dispatch({
        type: 'SHOW_CHARACTER_JOBS',
        payload: jobsArray
      })
    }
  })

  let transactionsURL = "https://esi.evetech.net/latest/characters/" +
    characterID +
    "/wallet/transactions/?datasource=tranquility&page=1&token=" + token;

  request('GET', transactionsURL, {
    json: true
  }).done((result) => {
    if (result.statusCode == 200) {
      let walletTransactionsArray = JSON.parse(result.getBody())
      dispatch({
        type: 'SHOW_CHARACTER_WALLET_TRANSACTIONS',
        payload: walletTransactionsArray
      })
    }
  })

}
