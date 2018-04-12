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
    //количество продукции
    let productionCountResult = this.props.data.activities.reaction.product.quantity*10;
    //цена операции продажи по ордеру
    let saleOrderTax = this.props.data.activities.reaction.product.setPrice/100*(2.57+1.2)
    let salesTax = Math.ceil(saleOrderTax);
    //цена операции продажи по buy ордерам
    let buyOrderTax = this.props.data.activities.reaction.product.buySetPrice/100*(1.2)
    let buyTax = Math.ceil(buyOrderTax);
    //стоимость производства на заводе
    let manufacturingСost = Math.ceil(this.props.data.activities.reaction.product.basePrice*productionCountResult/100*9.13);
    //общие расходы при продаже по sell
    let amountOfExpenses = Math.ceil(this.props.data.activities.reaction.allMaterialsPrice + manufacturingСost + saleOrderTax);
    //прибыль
    let profit = Math.ceil(this.props.data.activities.reaction.product.setPrice - amountOfExpenses);
    let profitPercent = profit/(amountOfExpenses/100);
    //общие расходы при продаже по buy
    let buyAmountOfExpenses = Math.ceil(this.props.data.activities.reaction.allMaterialsPrice + manufacturingСost + buyOrderTax);
    //прибыль
    let profit_buy = Math.ceil(this.props.data.activities.reaction.product.buySetPrice - buyAmountOfExpenses);
    let profitPercent_buy = profit_buy/(buyAmountOfExpenses/100);

    let collapseId = "collapse_" + this.props.data.blueprintTypeID;
    let collapseLink = "#" + collapseId;

    let profitSellClass = "text-danger bg-danger text-right"

    if(profit > 0){
      profitSellClass = "text-success bg-success text-right"
    }

    let profitBuyClass = "text-danger bg-danger text-right"

    if(profit_buy > 0){
      profitBuyClass = "text-success bg-success text-right"
    }

    return (

        <div>
          <div className="row">
            <div className="col-md-3">
              <a role="button" data-toggle="collapse" href={collapseLink} aria-expanded="false" aria-controls={collapseId}>
                <h5>{this.props.data.activities.reaction.product.name}</h5>
              </a>
            </div>
            <div className="col-md-3">10 циклов (сутки) = {productionCountResult} шт.</div>
            <div className="col-md-3"><div className={profitSellClass} >{String(profit).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK ({Math.floor(profitPercent)}%)</div></div>
            <div className="col-md-3"><div className={profitBuyClass} >{String(profit_buy).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK ({Math.floor(profitPercent_buy)}%)</div></div>
          </div>

          <div className="collapse" id={collapseId}>

            <div className="row">
              <div className="col-md-4">
                <dl className="dl-horizontal">
                  <dt>Цена за шт. (sell)</dt>
                  <dd>{String(this.props.data.activities.reaction.product.price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                  <dt>Цена за партию (sell)</dt>
                  <dd>{String(this.props.data.activities.reaction.product.price*productionCountResult).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                  <dt>Цена за шт. (buy)</dt>
                  <dd> {String(this.props.data.activities.reaction.product.buy_price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                  <dt>Цена за партию (buy)</dt>
                  <dd>{String(this.props.data.activities.reaction.product.buy_price*productionCountResult).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                </dl>
              </div>
              <div className="col-md-4">
                <dl className="list-inline">
                  {
                    this.props.data.activities.reaction.materials.map((e, i) =>
                    <div key={i}>
                    <dt>{e.name}</dt>
                    <dd>{e.economyQuantity} шт. - {String(e.price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK - {String(Math.ceil(e.setPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                    </div>
                    )
                  }
                </dl>
              </div>
              <div className="col-md-4">
                <dl className="dl-horizontal">
                  <dt>Цена материалов</dt>
                  <dd>{String(Math.ceil(this.props.data.activities.reaction.allMaterialsPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                  <dt>Цена производства</dt>
                  <dd>{String(manufacturingСost).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                  <dt>Налог на продажу</dt>
                  <dd>{String(salesTax).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                  <dt>Сумма всех затрат</dt>
                  <dd>{String(amountOfExpenses).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                </dl>
              </div>
            </div>

          </div>

        </div>
    )
  }
}
