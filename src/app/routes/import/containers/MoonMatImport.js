import React from 'react'
import { connect } from 'react-redux'

import { importMoonMatPrice } from '../actions/importMoonMatPrice'
import { importBlueprints } from '../actions/importBlueprints'

class MoonMatImport extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <div>
          <span>импортировано {this.props.testStore.importStore.importResult} записей</span><button onClick={this.props.onMoonMatPriceImport} >Import moonmat</button>
        </div>
        <div>
          <span>импортировано {this.props.testStore.importStore.importBlueprint} чертежей</span><button onClick={this.props.onBlueprintsImport} >Import blueprints</button>
        </div>
        <div>
          <button onClick={this.props.onBlueprintTypesImport} >Import blueprints type</button>
        </div>
        <div>
          <button onClick={this.props.onTypesImport} >Import types</button>
        </div>
      </div>
    )

  }
};

export default connect(
  state => ({
    testStore: state
  }),
  dispatch => ({
    onMoonMatPriceImport: () => {
        dispatch(importMoonMatPrice())
    },
    onBlueprintsImport: () => {
        dispatch(importBlueprints())
    },
    onBlueprintTypesImport: () => {
        dispatch(importMoonMatPrice())
    },
    onTypesImport: () => {
        dispatch(importMoonMatPrice())
    }
  })
)(MoonMatImport);
