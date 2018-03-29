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
      data.activities.manufacturing.product.buySetPrice = data.activities.manufacturing.product.buy_price * 1000;
      data.activities.manufacturing.allMaterialsPrice = 0;
      data.activities.manufacturing.materials.map((e, i) => {
        let percentEconomy = e.quantity == 1 ? 0 : e.quantity/100*10;
        e.economyQuantity = e.quantity*1000 - Math.ceil(percentEconomy*1000);
        e.setPrice = e.economyQuantity * e.price;
        data.activities.manufacturing.allMaterialsPrice += e.setPrice;
        data.activities.manufacturing.manufacturingPrice = data.activities.manufacturing.allMaterialsPrice/100*systemIndex  + (data.activities.manufacturing.allMaterialsPrice/100*systemIndex)/100*10;
      })

    }
  }

  render() {
    let saleOrderTax = this.props.data.activities.manufacturing.product.setPrice/100*(2.57+1.2)
    let buyOrderTax = this.props.data.activities.manufacturing.product.buySetPrice/100*(1.2)
    let manufacturingСost = Math.ceil(this.props.data.activities.manufacturing.manufacturingPrice);
    let salesTax = Math.ceil(saleOrderTax);
    let buyTax = Math.ceil(buyOrderTax);
    let amountOfExpenses = Math.ceil(this.props.data.activities.manufacturing.allMaterialsPrice + this.props.data.activities.manufacturing.manufacturingPrice + saleOrderTax);
    let buyAmountOfExpenses = Math.ceil(this.props.data.activities.manufacturing.allMaterialsPrice + this.props.data.activities.manufacturing.manufacturingPrice + buyOrderTax);
    let profit = Math.ceil(this.props.data.activities.manufacturing.product.setPrice - amountOfExpenses);
    let profitPercent = profit/(amountOfExpenses/100);
    let profit_buy = Math.ceil(this.props.data.activities.manufacturing.product.buySetPrice - buyAmountOfExpenses);
    let profitPercent_buy = profit_buy/(buyAmountOfExpenses/100);

    return (

        <div>
          <h3>{this.props.data.activities.manufacturing.product.name}: 1000 шт.</h3>
          <ul>
            <li>Цена за шт. (sell): {String(this.props.data.activities.manufacturing.product.price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li>Цена за шт. (buy): {String(this.props.data.activities.manufacturing.product.buy_price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')}  ISK</li>
          </ul>
          <ul>
            {
              this.props.data.activities.manufacturing.materials.map((e, i) =>
                <li key={i}>{e.name}: {e.economyQuantity} шт. - {String(e.price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK - {String(Math.ceil(e.setPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
              )
            }
          </ul>
          <ul>
            <li>Цена материалов: {String(Math.ceil(this.props.data.activities.manufacturing.allMaterialsPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li>Цена производства: {String(manufacturingСost).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li>Налог на продажу: {String(salesTax).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li>Сумма всех затрат: {String(amountOfExpenses).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
          </ul>
          <ul>
            <li>Цена продажи (sell): {String(Math.ceil(this.props.data.activities.manufacturing.product.setPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Профит (sell): {String(profit).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK ({Math.floor(profitPercent)}%)</strong></li>
            <li>Цена продажи (buy): {String(Math.ceil(this.props.data.activities.manufacturing.product.buySetPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Профит (buy): {String(profit_buy).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK ({Math.floor(profitPercent_buy)}%)</strong></li>
          </ul>
        </div>
    )
  }
}
