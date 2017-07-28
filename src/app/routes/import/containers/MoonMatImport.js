import React from 'react'
import { connect } from 'react-redux'

import { getImport } from '../actions/import'

class MoonMatImport extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {


  }


  render() {

    console.log("this.props:", this.props);


    // const importBtn = document.querySelectorAll('.import')[0]
    // importBtn.addEventListener('click', () => {
    //   alert(1)
    // })

    return (
      <div>
        <span>импортировано  {this.props.testStore.importStore.importResult} записей</span><button onClick={this.props.onImport} >Import</button>
      </div>
    )

  }
};

export default connect(
  state => ({
    testStore: state
  }),
  dispatch => ({
    onImport: () => {
      dispatch(getImport())
    }
  })
)(MoonMatImport);
