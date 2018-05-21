import React from 'react'
import { connect } from 'react-redux'

import { importPrice } from '../../import/actions/importPrice'
import { getPolimerReactionBlueprints } from '../actions/getPolimerReactionBlueprints'
import ReactionProductionEfficiency from '../../../components/production/ReactionProductionEfficiency'

class PolimerReaction extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let blueprints = this.props.localState.blueprintStore.polimerReactionBlueprints;
    let systemIndex = 9.67;

    return (
      <div className="container">
        <div className="row">
          <div className="">
            <h3>Import price components <span className="badge">{this.props.localState.importStore.importResult}</span></h3>
            <div className="btn-group" role="group" aria-label="Import price">
              <button type="button" className="btn btn-default" onClick={this.props.onImportJita}>Jita</button>
              <button type="button" className="btn btn-default" onClick={this.props.onImportAmarr}>Amarr</button>
              <button type="button" className="btn btn-default" onClick={this.props.onImportDodixie}>Dodixie</button>
              <button type="button" className="btn btn-default" onClick={this.props.onImportRens}>Rens</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <h3>Polimer reaction production efficiency</h3>
          </div>
          <div className="col-md-3">
            <div className="btn-group" role="group" aria-label="">
              <button type="button" className="btn btn-default" onClick={this.props.onShowJita}>Jita</button>
              <button type="button" className="btn btn-default" onClick={this.props.onShowAmarr}>Amarr</button>
              <button type="button" className="btn btn-default" onClick={this.props.onShowDodixie}>Dodixie</button>
              <button type="button" className="btn btn-default" onClick={this.props.onShowRens}>Rens</button>
            </div>
          </div>
        </div>

        <div>

            {
              blueprints.map((e, i) =>
                  <div key={i}>
                    <ReactionProductionEfficiency data={e} systemIndex={systemIndex} />
                  </div>
              )
            }

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
        dispatch(importPrice(10000002, [711,18,974,1136]))
    },
    onImportAmarr: () => {
        dispatch(importPrice(10000043, [711,18,974,1136]))
    },
    onImportDodixie: () => {
        dispatch(importPrice(10000032, [711,18,974,1136]))
    },
    onImportRens: () => {
        dispatch(importPrice(10000030, [711,18,974,1136]))
    },
    onShowAmarr: () => {
        dispatch(getPolimerReactionBlueprints(1889, 60008494, 1.09))
    },
    onShowJita: () => {
        dispatch(getPolimerReactionBlueprints(1889, 60003760, 9.13))
    },
    onShowRens: () => {
        dispatch(getPolimerReactionBlueprints(1889, 60004588, 3.65))
    },
    onShowDodixie: () => {
        dispatch(getPolimerReactionBlueprints(1889, 60011866, 3.65))
    }
  })
)(PolimerReaction);
