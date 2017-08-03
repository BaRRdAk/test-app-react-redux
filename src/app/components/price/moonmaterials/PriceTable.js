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
        <table>
          <tbody>
          <tr><th>price</th><th>volume_total</th><th>volume_remain</th></tr>
          {this.props.data.map((e, i) =>
              <tr key={i}><td>{e.price}</td><td>{e.volume_total}</td><td>{e.volume_remain}</td></tr>
          )}
          </tbody>
        </table>
    )
  }
}
