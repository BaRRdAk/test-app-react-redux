import React from 'react'

import request from 'then-request'

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props)

    this.db = openDatabase("EVE", "0.1", "EVE Online price.", 200000)

    if (!this.db) {
      console.log('Failed to connect to database.')
    }

    this.state = {
      array: [],
      localPrice: []
    }
  }


  componentDidMount() {
    let db = this.db

    let localPrice = []

    db.transaction(function(tx) {
      tx.executeSql("SELECT * FROM Price WHERE location_id = '60003760' AND is_buy_order = 'false' ORDER BY price", [], function(tx, result) {

        for (let row of result.rows) {
          localPrice.push(row)
        }
      }, null)
    })

    this.setState({
      localPrice: localPrice
    })
  }

  render() {

    const { localPrice } = this.state

    return (
      <div>
        <h1>Dashboard</h1>
        <ul>
          {
            localPrice.map((e, i) => {
              return <li key={i}>{e.location_id} - {e.price}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
