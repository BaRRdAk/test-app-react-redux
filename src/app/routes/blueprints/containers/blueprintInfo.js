import React from 'react'
import { connect } from 'react-redux'


class BlueprintInfo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>

      </div>
    )

  }
};

export default connect(
  state => ({
    localState: state
  }),
  dispatch => ({

  })
)(BlueprintInfo);
