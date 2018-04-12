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
      <div className="container">

        <div className="row">
          <div className="col-md-9">
            <h3>Reaction production efficiency</h3>
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
