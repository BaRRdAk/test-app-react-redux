import React from 'react'
import { connect } from 'react-redux'

import { getReactionBlueprints } from '../actions/getReactionBlueprints'
import ReactionProductionEfficiency from '../../../components/production/ReactionProductionEfficiency'

class Reaction extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let blueprints = this.props.localState.blueprintStore.reactionBlueprints;
    let systemIndex = 9.67;

    return (
      <div>
        <div>
          <button onClick={this.props.onShowJita} >Show blueprints(Jita)</button><button onClick={this.props.onShowAmarr} >Show blueprints(Amarr)</button><button onClick={this.props.onShowRens} >Show blueprints(Rens)</button><button onClick={this.props.onShowDodixie} >Show blueprints(Dodixie)</button>
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
    onShowAmarr: () => {
        dispatch(getReactionBlueprints(60008494, 1.09))
    },
    onShowJita: () => {
        dispatch(getReactionBlueprints(60003760, 2.73))
    },
    onShowRens: () => {
        dispatch(getReactionBlueprints(60004588, 3.65))
    },
    onShowDodixie: () => {
        dispatch(getReactionBlueprints(60011866, 3.65))
    }
  })
)(Reaction);
