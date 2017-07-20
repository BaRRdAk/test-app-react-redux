import React from 'react'

import PriceTable from '../../../components/price/moonmaterials/PriceTable'

export default class FerrogelPrice extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      ferrogelPrice: [],
    }

    this.db = openDatabase("EVE", "0.1", "EVE Online price.", 200000)

    if (!this.db) {
      console.log('Failed to connect to database.')
    }

  }

  componentWillMount() {

    let ferrogelRows = [];

    this.db.transaction(function(tx) {
      tx.executeSql("SELECT * FROM Price WHERE location_id = '60003760' AND is_buy_order = 'false' ORDER BY price", [], function(tx, result) {
        for (let row of result.rows) {
          ferrogelRows.push(row)
        }
      }, null)
    })

    this.setState({
      ferrogelPrice: ferrogelRows
    })

  }

  render() {

    const { ferrogelPrice } = this.state;

    return (
      <div>
        <h3>Ferrogel</h3>
        <PriceTable data={ferrogelPrice}/>
      </div>
    )
  }
}
