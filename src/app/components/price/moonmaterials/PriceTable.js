import React from 'react'

export default class PriceTable extends React.Component {

  componentDidMount = ()=> {
    this.renderTable(this.props.data)
  }
  componentWillReceiveProps = (nextProps) => {
    this.renderTable(nextProps.data)
  }

  renderTable(data) {
    if (data) {
      //console.log("Prices:", this.props.data);
    }
  }

  render() {

    return (
      <div>
        <table>
          <tbody>
          <tr><th>location_id</th><th>price</th></tr>
          {this.props.data.map((e, i) =>
              <tr key={i}><td>{e.location_id}</td><td>{e.price}</td></tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
}
