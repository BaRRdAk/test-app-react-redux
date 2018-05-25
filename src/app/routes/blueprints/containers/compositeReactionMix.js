import React from 'react'
import { connect } from 'react-redux'

import { importPrice } from '../../import/actions/importPrice'
import { getCompositeReactionMixBlueprints } from '../actions/getCompositeReactionMixBlueprints'
import ReactionProductionEfficiency from '../../../components/production/ReactionProductionEfficiency'

class CompositeReactionMix extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let blueprints = this.props.localState.blueprintStore.compositeReactionBlueprints;
    let systemIndex = 1.3;

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
              <button type="button" className="btn btn-default" onClick={this.props.onImportDomainJita}>Domain&Jita</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <h3>Composite reaction production efficiency</h3>
          </div>
          <div className="col-md-3">
            <div className="btn-group" role="group" aria-label="">
              <button type="button" className="btn btn-default" onClick={this.props.onShowDomainJita}>Domain&Jita</button>
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
    onImportDomainJita: () => {
        dispatch(importPrice(10000002, [429,428,1136,427]))
        dispatch(importPrice(10000043, [429,428,1136,427]))
    },
    onShowDomainJita: () => {
        dispatch(getCompositeReactionMixBlueprints(1888, 1.3))
    }
  })
)(CompositeReactionMix);
