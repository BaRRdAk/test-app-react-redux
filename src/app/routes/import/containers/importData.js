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
          <button className="btn btn-default" onClick={this.props.onImportStaticData} >Import static data <span className="badge">{this.props.localState.importStore.importStaticDataResult}</span></button>
        </div>

        <div>
          <h3>Import price <span className="badge">{this.props.localState.importStore.importResult}</span></h3>
          <div className="btn-group" role="group" aria-label="Import price">
            <button type="button" className="btn btn-default" onClick={this.props.onImportJita}>Jita</button>
            <button type="button" className="btn btn-default" onClick={this.props.onImportAmarr}>Amarr</button>
            <button type="button" className="btn btn-default" onClick={this.props.onImportDodixie}>Dodixie</button>
            <button type="button" className="btn btn-default" onClick={this.props.onImportRens}>Rens</button>
          </div>
        </div>
        <div>
          <h3>Import price history <span className="badge">{this.props.localState.importStore.importPriceHistoryResult}</span></h3>
          <div className="btn-group" role="group" aria-label="Import price">
            <button type="button" className="btn btn-default" onClick={this.props.onImportJitaHistory}>Jita</button>
            <button type="button" className="btn btn-default" onClick={this.props.onImportAmarrHistory}>Amarr</button>
            <button type="button" className="btn btn-default" onClick={this.props.onImportDodixieHistory}>Dodixie</button>
            <button type="button" className="btn btn-default" onClick={this.props.onImportRensHistory}>Rens</button>
          </div>
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
        dispatch(importPrice(10000002, null))
    },
    onImportAmarr: () => {
        dispatch(importPrice(10000043, null))
    },
    onImportDodixie: () => {
        dispatch(importPrice(10000032, null))
    },
    onImportRens: () => {
        dispatch(importPrice(10000030, null))
    },
    onImportProvidence: () => {
        dispatch(importPrice(10000047, null))
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
