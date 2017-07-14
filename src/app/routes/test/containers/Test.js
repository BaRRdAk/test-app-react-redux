import React from 'react'

import request from 'then-request'

export default class Test extends React.Component {

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

  componentWillMount() {
    request('GET', 'https://esi.tech.ccp.is/latest/markets/10000002/orders/?datasource=tranquility&order_type=all&type_id=34', {json: true}).done((res)=> {
      this.setState({ array: JSON.parse(res.getBody()) });
    })

    const { array } = this.state

    console.log(this.state.array);

    this.db.transaction(function(tx) {
      tx.executeSql("CREATE TABLE IF NOT EXISTS Price (order_id REAL UNIQUE, type_id REAL, location_id REAL, volume_total REAL, volume_remain REAL, min_volume REAL, price REAL, is_buy_order REAL, duration REAL, issued REAL, range TEXT)", [], null, null);



    });

    array.map((e) => {
      this.db.transaction(function(tx) {
        tx.executeSql("INSERT INTO Price (order_id, type_id, location_id, volume_total, volume_remain, min_volume, price, is_buy_order, duration, issued, range) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [e.order_id, e.type_id, e.location_id, e.volume_total, e.volume_remain, e.min_volume, e.price, e.is_buy_order, e.duration, e.issued, e.range], null, null);
      });
    });

    // this.db.transaction(function(tx) {
    //   tx.executeSql("DELETE FROM Price", [], null, null);
    // });

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
        <ul>
          {localPrice.map((e, i) => {
            return <li key={i}>{e.location_id} - {e.price}</li>
          })}
        </ul>
      </div>
    )
  }
}
