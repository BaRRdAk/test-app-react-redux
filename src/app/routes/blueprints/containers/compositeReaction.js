import React from 'react'
import { connect } from 'react-redux'

import { importPrice } from '../../import/actions/importPrice'
import { getReactionBlueprints } from '../actions/getReactionBlueprints'
import ReactionProductionEfficiency from '../../../components/production/ReactionProductionEfficiency'

class CompositeReaction extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let blueprints = this.props.localState.blueprintStore.reactionBlueprints;
    let systemIndex = 9.67;

    let advacedMoonMaterialsBlueprints = [];
    let processedMoonMaterialsBlueprints = [];

    blueprints.map((blueprint) => {
      switch(blueprint.activities.reaction.product.groupID) {
        case 429:
          advacedMoonMaterialsBlueprints.push(blueprint);
          break;

        case 428:
          processedMoonMaterialsBlueprints.push(blueprint);
          break;

      }
    }
    )


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
            <h3>Composite reaction production efficiency</h3>
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

            <h4>Advaced moon materials</h4>
            <hr/>
            {
              advacedMoonMaterialsBlueprints.map((e, i) =>
                  <div key={i}>
                    <ReactionProductionEfficiency data={e} systemIndex={systemIndex} />
                  </div>
              )
            }

            <h4>Processed moon materials</h4>
            <hr/>
            {
              processedMoonMaterialsBlueprints.map((e, i) =>
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
        dispatch(importPrice(10000002, [429,428,1136,427]))
    },
    onImportAmarr: () => {
        dispatch(importPrice(10000043, [429,428,1136,427]))
    },
    onImportDodixie: () => {
        dispatch(importPrice(10000032, [429,428,1136,427]))
    },
    onImportRens: () => {
        dispatch(importPrice(10000030, [429,428,1136,427]))
    },
    onShowAmarr: () => {
        dispatch(getReactionBlueprints(1888, 60008494, 1.09))
    },
    onShowJita: () => {
        dispatch(getReactionBlueprints(1888, 60003760, 9.13))
    },
    onShowRens: () => {
        dispatch(getReactionBlueprints(1888, 60004588, 3.65))
    },
    onShowDodixie: () => {
        dispatch(getReactionBlueprints(1888, 60011866, 3.65))
    }
  })
)(CompositeReaction);
