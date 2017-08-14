import React from 'react'
import { connect } from 'react-redux'

import { importPrice } from '../actions/importPrice'
import { importPriceHistory } from '../actions/importPriceHistory'
import { importStaticData } from '../actions/importStaticData'

class ImportData extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <div>
          <span>импортировано {this.props.localState.importStore.importStaticDataResult} статических объектов</span><button onClick={this.props.onImportStaticData} >Import static data</button>
        </div>
        <div>
          <span>импортировано {this.props.localState.importStore.importResult} записей</span><button onClick={this.props.onImportPrice} >Import price</button>
        </div>
        <div>
          <span>импортировано {this.props.localState.importStore.importPriceHistoryResult} записей</span><button onClick={this.props.onImportPriceHystory} >Import price history</button>
        </div>
      </div>
    )
  }
};

export default connect(
  state => ({
    localState: state
  }),
  dispatch => ({
    onImportPrice: () => {
        dispatch(importPrice())
    },
    onImportPriceHystory: () => {
        dispatch(importPriceHistory())
    },
    onImportStaticData: () => {
        dispatch(importStaticData())
    },
  })
)(ImportData);
