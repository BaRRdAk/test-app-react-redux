import React from 'react'

export default class ProductionEfficiency extends React.Component {

  componentDidMount = ()=> {
    this.renderEfficiency(this.props.data, this.props.systemIndex)
  }
  componentWillReceiveProps = (nextProps) => {
    this.renderEfficiency(nextProps.data, this.props.systemIndex)
  }

  renderEfficiency(data, systemIndex) {

    if (data) {
      data.activities.manufacturing.product.setPrice = data.activities.manufacturing.product.price * 1000;
      data.activities.manufacturing.allPrice = 0;
      data.activities.manufacturing.materials.map((e, i) => {
        let percentEconomy = e.quantity == 1 ? 0 : e.quantity/100*10;
        e.economyQuantity = e.quantity*1000 - Math.ceil(percentEconomy*1000);
        e.setPrice = e.economyQuantity * e.price;
        data.activities.manufacturing.allPrice += e.setPrice;
        data.activities.manufacturing.manufacturingPrice = data.activities.manufacturing.allPrice/100*systemIndex  + (data.activities.manufacturing.allPrice/100*systemIndex)/100*10;
      })

    }
  }

  render() {
    let saleOrderTax = this.props.data.activities.manufacturing.product.setPrice/100*(2.57+1.2)
    let manufacturingСost = Math.ceil(this.props.data.activities.manufacturing.manufacturingPrice);
    let salesTax = Math.ceil(saleOrderTax);
    let amountOfExpenses = Math.ceil(this.props.data.activities.manufacturing.allPrice + this.props.data.activities.manufacturing.manufacturingPrice + saleOrderTax);
    let profit = Math.ceil(this.props.data.activities.manufacturing.product.setPrice - amountOfExpenses);
    let profitPercent = profit/(amountOfExpenses/100)


    return (

        <div>
          <div><strong>{this.props.data.activities.manufacturing.product.name}:</strong> x1000 - {String(this.props.data.activities.manufacturing.product.setPrice).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</div>
          <ul>
            {
              this.props.data.activities.manufacturing.materials.map((e, i) =>
                <li key={i}>{e.name}: {e.economyQuantity} шт. - {String(e.price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK - {String(e.setPrice).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
              )
            }
            <li><strong>Цена материалов:</strong> {String(Math.ceil(this.props.data.activities.manufacturing.allPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Цена производства:</strong> {String(manufacturingСost).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Налог на продажу:</strong> {String(salesTax).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Сумма всех затрат:</strong> {String(amountOfExpenses).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Профит:</strong> {String(profit).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Профит:</strong> {Math.floor(profitPercent)}%</li>
          </ul>
        </div>
    )
  }
}
