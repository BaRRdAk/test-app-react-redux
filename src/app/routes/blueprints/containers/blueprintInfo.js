import React from 'react'
import { connect } from 'react-redux'

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
      <div>
        <div>
          <button onClick={this.props.onShowJita} >Show blueprints(Jita)</button><button onClick={this.props.onShowAmarr} >Show blueprints(Amarr)</button><button onClick={this.props.onShowRens} >Show blueprints(Rens)</button><button onClick={this.props.onShowDodixie} >Show blueprints(Dodixie)</button>
        </div>
        <div>
          <h2>Amarr</h2>
            {
              amarrBlueprints.map((e, i) =>
                  <div key={i}>
                    <ProductionEfficiency data={e} systemIndex={systemIndex} />
                  </div>
              )
            }
          <h2>Galente</h2>
            {
              galenteBlueprints.map((e, i) =>
                  <div key={i}>
                    <ProductionEfficiency data={e} systemIndex={systemIndex} />
                  </div>
              )
            }
          <h2>Caldari</h2>
            {
              caldariBlueprints.map((e, i) =>
                  <div key={i}>
                    <ProductionEfficiency data={e} systemIndex={systemIndex} />
                  </div>
              )
            }
          <h2>Minmatar</h2>
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
