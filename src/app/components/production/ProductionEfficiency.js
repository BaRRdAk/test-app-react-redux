import React from 'react'

export default class ProductionEfficiency extends React.Component {

  componentDidMount = ()=> {
    this.renderEfficiency(this.props.data)
  }
  componentWillReceiveProps = (nextProps) => {
    this.renderEfficiency(nextProps.data)
  }

  renderEfficiency(data) {
    if (data) {
      data.activities.manufacturing.product.setPrice = data.activities.manufacturing.product.price * 1000;

      data.activities.manufacturing.materials.map((e, i) => {
        let percentEconomy = e.quantity == 1 ? 0 : e.quantity/100*10;
        e.economyQuantity = e.quantity*1000 - Math.ceil(percentEconomy*1000);
        e.setPrice = e.economyQuantity * e.price;
      })

    }
  }

  render() {

    return (

        <div>
          <div><strong>{this.props.data.activities.manufacturing.product.name}</strong> - {this.props.data.activities.manufacturing.product.price} ISK - {this.props.data.activities.manufacturing.product.setPrice}</div>
          <ul>
            {
              this.props.data.activities.manufacturing.materials.map((e, i) =>
                <li key={i}>{e.name} - {e.quantity} - {e.price} - {e.economyQuantity} - {e.setPrice}</li>
              )
            }
          </ul>
        </div>
    )
  }
}
