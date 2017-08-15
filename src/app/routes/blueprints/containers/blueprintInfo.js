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
          <button onClick={this.props.onShowBlueprints} >Show blueprints</button>
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
    onShowBlueprints: () => {
        dispatch(getBlueprints())
    },
  })
)(BlueprintInfo);
