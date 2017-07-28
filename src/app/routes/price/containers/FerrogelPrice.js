import React from 'react'
import { connect } from 'react-redux'

import PriceTable from '../../../components/price/moonmaterials/PriceTable'
import { getPrice } from '../actions/prices'

class FerrogelPrice extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onQuery();
  }

  render() {

    const { priceResult } = this.props.testStore.priceStore;

    //console.log("this.props:", this.props);

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
    onQuery: () => {
      dispatch(getPrice())
    }
  })
)(FerrogelPrice);
