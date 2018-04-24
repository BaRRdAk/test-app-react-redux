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
            <div className="col-md-4">
              <a role="button" data-toggle="collapse" href={collapseLink} aria-expanded="false" aria-controls={collapseId}>
                <strong><img src={'https://image.eveonline.com/Type/' + this.props.data.activities.manufacturing.product.typeID + '_32.png'} />{this.props.data.activities.manufacturing.product.name}</strong>
              </a>
            </div>
            <div className="col-md-2">1000 шт.</div>
            <div className="col-md-3"><div className={profitSellClass} >{String(profit).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK ({Math.floor(profitPercent)}%)</div></div>
            <div className="col-md-3"><div className={profitBuyClass} >{String(profit_buy).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK ({Math.floor(profitPercent_buy)}%)</div></div>
          </div>

          <div className="collapse" id={collapseId}>
            <div className="row">
              <div className="col-md-4">

                <dl className="dl-horizontal">
                  <dt>Цена за шт. (sell)</dt>
                  <dd>{String(this.props.data.activities.manufacturing.product.price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                  <dt>Цена за партию (sell)</dt>
                  <dd>{String(Math.ceil(this.props.data.activities.manufacturing.product.setPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                  <dt>Цена за шт. (buy)</dt>
                  <dd>{String(this.props.data.activities.manufacturing.product.buy_price).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                  <dt>Цена за партию (buy)</dt>
                  <dd>{String(Math.ceil(this.props.data.activities.manufacturing.product.buySetPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
                  <dt>Объем спроса</dt>
                  <dd>{String(this.props.data.activities.manufacturing.product.profitableMarket).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} шт.</dd>
                </dl>

              </div>
              <div className="col-md-4">
                <dl className="list-inline">
                  {
                    this.props.data.activities.manufacturing.materials.map((e, i) =>
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
                  <dd>{String(Math.ceil(this.props.data.activities.manufacturing.allMaterialsPrice)).replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')} ISK</dd>
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
