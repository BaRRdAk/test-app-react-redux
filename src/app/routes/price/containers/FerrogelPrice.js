import React from 'react'
import PriceTable from '../../../components/price/moonmaterials/PriceTable'
import { connect } from 'react-redux'

import {bindActionCreators} from 'redux'

class FerrogelPrice extends React.Component {

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
      tx.executeSql("SELECT * FROM Price WHERE type_id = ? AND location_id = ? AND is_buy_order = ? ORDER BY price", [16683, 60003760, false], function(tx, result) {
        for (let row of result.rows) {
          ferrogelRows.push(row)
        }

      }, null)
    })

this.props.onQuery(ferrogelRows);

    // this.setState({
    //  ferrogelPrice: ferrogelRows
    // })

  }


  // Костыль для AJAX
  // tick = () => {
  //   this.setState({
  //     updatingData: []
  //   });
  // }
  // componentDidMount() {
  //   this.interval = setInterval(this.tick, 1000);
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }
  // Конец костыля


  render() {

    const { priceResult } = this.props.testStore.priceStore;

    console.log("this.props:", this.props);

    return (
      <div>
        <h3>Ferrogel</h3>
        <PriceTable data={this.props.testStore.priceStore.priceResult}/>
      </div>
    )
  }
};

export default connect(
  state => ({
    testStore: state
  }),
  dispatch => ({
    onQuery: (ferrogelPrice) => {
      const asyncGetPrice = () => {




        return dispatch => {
          dispatch({ type: 'SHOW_PRICE', payload: ferrogelPrice })
        }
      }
      dispatch(asyncGetPrice())
    }
  })
)(FerrogelPrice);
