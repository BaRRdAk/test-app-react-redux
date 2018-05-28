import React from 'react'
import { connect } from 'react-redux'

import { importPrice } from '../../import/actions/importPrice'
import { getAdvancedComponentsMixBlueprints } from '../actions/getAdvancedComponentsMixBlueprints'
import ProductionEfficiency from '../../../components/production/ProductionEfficiency'

class AdvancedComponentsMix extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let blueprints = this.props.localState.blueprintStore.blueprints;
    let systemIndex = this.props.localState.blueprintStore.systemIndex;

    let amarrBlueprints = [];
    let galenteBlueprints = [];
    let caldariBlueprints = [];
    let minmatarBlueprints = [];

    blueprints.map((blueprint) => {
      switch(blueprint.marketGroupID) {
        case 1592:
          amarrBlueprints.push(blueprint);
          break;

        case 1594:
          galenteBlueprints.push(blueprint);
          break;

        case 1593:
          caldariBlueprints.push(blueprint);
          break;

        case 1595:
          minmatarBlueprints.push(blueprint);
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
            <h3>Advanced components production efficiency</h3>
          </div>
          <div className="col-md-3">
            <div className="btn-group" role="group" aria-label="">
              <button type="button" className="btn btn-default" onClick={this.props.onShowDomainJita}>Domain&Jita</button>
            </div>
          </div>
        </div>

        <div>
          <h4>Amarr components</h4>
          <hr/>
            {
              amarrBlueprints.map((e, i) =>
                  <div key={i}>
                    <ProductionEfficiency data={e} systemIndex={systemIndex} />
                  </div>
              )
            }

          <h4>Galente components</h4>
          <hr/>
            {
              galenteBlueprints.map((e, i) =>
                  <div key={i}>
                    <ProductionEfficiency data={e} systemIndex={systemIndex} />
                  </div>
              )
            }

          <h4>Caldari components</h4>
          <hr/>
            {
              caldariBlueprints.map((e, i) =>
                  <div key={i}>
                    <ProductionEfficiency data={e} systemIndex={systemIndex} />
                  </div>
              )
            }

          <h4>Minmatar components</h4>
          <hr/>
            {
              minmatarBlueprints.map((e, i) =>
                  <div key={i}>
                    <ProductionEfficiency data={e} systemIndex={systemIndex} />
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
        dispatch(importPrice(10000002, [334,429]))
        dispatch(importPrice(10000043, [334,429]))
    },
    onShowDomainJita: () => {
        dispatch(getAdvancedComponentsMixBlueprints(447, 1.3))
    }
  })
)(AdvancedComponentsMix);
