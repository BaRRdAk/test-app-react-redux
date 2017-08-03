import React from 'react'
import { connect } from 'react-redux'

import PriceTable from '../../../components/price/moonmaterials/PriceTable'
import { getPrice } from '../actions/price'

class AllPrice extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onQuery(60003760);
  }

  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  }

  render() {

    const { priceResult } = this.props.localState.priceStore;

    let priceMatArray = []
    for (let key in priceResult) {
      priceMatArray.push({name: key, price: priceResult[key]})
    }

    return (
      <div>
      {
        priceMatArray.map((e, i) =>
        <div key={i}>
          <h4>{e.name}</h4>
          <PriceTable data={e.price} />
        </div>
        )
      }
      </div>
    )

  }
};

export default connect(
  state => ({
    localState: state
  }),
  dispatch => ({
    onQuery: (location_id) => {
      dispatch(getPrice(location_id))
    }
  })
)(AllPrice);
