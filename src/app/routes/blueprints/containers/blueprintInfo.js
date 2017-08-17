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

    return (
      <div>
        <div>
          <button onClick={this.props.onShowJita} >Show blueprints(Jita)</button><button onClick={this.props.onShowAmarr} >Show blueprints(Amarr)</button><button onClick={this.props.onShowRens} >Show blueprints(Rens)</button><button onClick={this.props.onShowDodixie} >Show blueprints(Dodixie)</button>
        </div>
        <div>
          {
            blueprints.map((e, i) =>
              <div key={i}>
                <ProductionEfficiency data={e} />
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
        dispatch(getBlueprints(60008494))
    },
    onShowJita: () => {
        dispatch(getBlueprints(60003760))
    },
    onShowRens: () => {
        dispatch(getBlueprints(60004588))
    },
    onShowDodixie: () => {
        dispatch(getBlueprints(60011866))
    }
  })
)(BlueprintInfo);
