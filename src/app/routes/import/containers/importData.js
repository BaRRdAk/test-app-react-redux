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
      <div className="container">
        <div>
          <span>импортировано {this.props.localState.importStore.importStaticDataResult} статических объектов</span><button className="btn btn-default" onClick={this.props.onImportStaticData} >Import static data</button>
        </div>
        <div>
          <span>импортировано {this.props.localState.importStore.importResult} записей</span><button onClick={this.props.onImportJita} >Import Jita price</button><button onClick={this.props.onImportAmarr} >Import Amarr price</button><button onClick={this.props.onImportDodixie} >Import Dodixie price</button><button onClick={this.props.onImportRens} >Import Rens price</button><button onClick={this.props.onImportProvidence} >Import Providence price</button>
        </div>
        <div>
          <span>импортировано {this.props.localState.importStore.importPriceHistoryResult} записей</span><button onClick={this.props.onImportJitaHistory} >Import Jita price history</button><button onClick={this.props.onImportAmarrHistory} >Import Amarr price history</button><button onClick={this.props.onImportDodixieHistory} >Import Dodixie price history</button><button onClick={this.props.onImportRensHistory} >Import Rens price history</button><button onClick={this.props.onImportProvidenceHistory} >Import Providence price history</button>
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
    onImportJita: () => {
        dispatch(importPrice(10000002))
    },
    onImportAmarr: () => {
        dispatch(importPrice(10000043))
    },
    onImportDodixie: () => {
        dispatch(importPrice(10000032))
    },
    onImportRens: () => {
        dispatch(importPrice(10000030))
    },
    onImportProvidence: () => {
        dispatch(importPrice(10000047))
    },
    onImportJitaHistory: () => {
        dispatch(importPriceHistory(10000002))
    },
    onImportAmarrHistory: () => {
        dispatch(importPriceHistory(10000043))
    },
    onImportDodixieHistory: () => {
        dispatch(importPriceHistory(10000032))
    },
    onImportRensHistory: () => {
        dispatch(importPriceHistory(10000030))
    },
    onImportProvidenceHistory: () => {
        dispatch(importPriceHistory(10000047))
    },
    onImportStaticData: () => {
        dispatch(importStaticData())
    },
  })
)(ImportData);
