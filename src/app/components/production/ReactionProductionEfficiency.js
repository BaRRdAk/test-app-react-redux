import React from 'react'

export default class ReactionProductionEfficiency extends React.Component {

  componentDidMount = ()=> {
    this.renderEfficiency(this.props.data, this.props.systemIndex)
  }
  componentWillReceiveProps = (nextProps) => {
    this.renderEfficiency(nextProps.data, this.props.systemIndex)
  }

  renderEfficiency(data, systemIndex) {

    if (data) {
      data.activities.reaction.product.setPrice = data.activities.reaction.product.price * data.activities.reaction.product.quantity * 10;
      data.activities.reaction.product.buySetPrice = data.activities.reaction.product.buy_price * data.activities.reaction.product.quantity * 10;
      data.activities.reaction.allMaterialsPrice = 0;
      data.activities.reaction.materials.map((e, i) => {
        let percentEconomy = e.quantity == 1 ? 0 : e.quantity/100*2;
        e.economyQuantity = e.quantity*10 - Math.ceil(percentEconomy*10);
        e.setPrice = e.economyQuantity * e.price;
        data.activities.reaction.allMaterialsPrice += e.setPrice;
        data.activities.reaction.manufacturingPrice = data.activities.reaction.allMaterialsPrice/100*systemIndex;
      })

    }
  }

  render() {
    let productionCountResult = this.props.data.activities.reaction.product.quantity*10;
    let saleOrderTax = this.props.data.activities.reaction.product.setPrice/100*(2.57+1.2)
    let buyOrderTax = this.props.data.activities.reaction.product.buySetPrice/100*(1.2)
    let manufacturingСost = Math.ceil(this.props.data.activities.reaction.product.basePrice*productionCountResult/100*9.67);
    let salesTax = Math.ceil(saleOrderTax);
    let buyTax = Math.ceil(buyOrderTax);
    let amountOfExpenses = Math.ceil(this.props.data.activities.reaction.allMaterialsPrice + this.props.data.activities.reaction.manufacturingPrice + saleOrderTax);
    let buyAmountOfExpenses = Math.ceil(this.props.data.activities.reaction.allMaterialsPrice + this.props.data.activities.reaction.manufacturingPrice + buyOrderTax);
    let profit = Math.ceil(this.props.data.activities.reaction.product.setPrice - amountOfExpenses);
    let profitPercent = profit/(amountOfExpenses/100);
    let profit_buy = Math.ceil(this.props.data.activities.reaction.product.buySetPrice - buyAmountOfExpenses);
    let profitPercent_buy = profit_buy/(buyAmountOfExpenses/100);

    return (

        <div>
          <div><strong>{this.props.data.activities.reaction.product.name}:</strong> x10 = {productionCountResult} - {String(Math.ceil(this.props.data.activities.reaction.product.setPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK ( {String(Math.ceil(this.props.data.activities.reaction.product.buySetPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} )</div>
          <ul>
            {
              this.props.data.activities.reaction.materials.map((e, i) =>
                <li key={i}>{e.name}: {e.economyQuantity} шт. - {String(e.price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK - {String(e.setPrice).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
              )
            }
            <li><strong>Цена материалов:</strong> {String(Math.ceil(this.props.data.activities.reaction.allMaterialsPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Цена производства:</strong> {String(manufacturingСost).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Налог на продажу:</strong> {String(salesTax).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Сумма всех затрат:</strong> {String(amountOfExpenses).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Профит:</strong> {String(profit).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Профит:</strong> {Math.floor(profitPercent)}%</li>
            <li><strong>Профит (buy):</strong> {String(profit_buy).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</li>
            <li><strong>Профит (buy):</strong> {Math.floor(profitPercent_buy)}%</li>
          </ul>
        </div>
    )
  }
}
