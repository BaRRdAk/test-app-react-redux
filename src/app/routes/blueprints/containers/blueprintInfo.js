import React from 'react'
import { connect } from 'react-redux'

import { importPrice } from '../../import/actions/importPrice'
import { getBlueprints } from '../actions/getBlueprints'
import ProductionEfficiency from '../../../components/production/ProductionEfficiency'

class BlueprintInfo extends React.Component {

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
              <button type="button" className="btn btn-default" onClick={this.props.onImportJita}>Jita</button>
              <button type="button" className="btn btn-default" onClick={this.props.onImportAmarr}>Amarr</button>
              <button type="button" className="btn btn-default" onClick={this.props.onImportDodixie}>Dodixie</button>
              <button type="button" className="btn btn-default" onClick={this.props.onImportRens}>Rens</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <h3>Advanced components production efficiency</h3>
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
    onImportJita: () => {
        dispatch(importPrice(10000002, [334,429]))
    },
    onImportAmarr: () => {
        dispatch(importPrice(10000043, [334,429]))
    },
    onImportDodixie: () => {
        dispatch(importPrice(10000032, [334,429]))
    },
    onImportRens: () => {
        dispatch(importPrice(10000030, [334,429]))
    },
    onShowAmarr: () => {
        dispatch(getBlueprints(60008494, 1.09))
    },
    onShowJita: () => {
        dispatch(getBlueprints(60003760, 2.73))
    },
    onShowRens: () => {
        dispatch(getBlueprints(60004588, 3.65))
    },
    onShowDodixie: () => {
        dispatch(getBlueprints(60011866, 3.65))
    }
  })
)(BlueprintInfo);
