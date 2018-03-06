import React from 'react'

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ul>
            <li><a href='/#/dashboard'>dashboard</a></li>
            <li><a href='/#/import'>Import market orders</a></li>
            <li><a href='/#/price/moonmat'>Advanced moon materials price history</a></li>
            <li><a href='/#/price/component'>Advanced components price history</a></li>
            <li><a href='/#/blueprints/advancedComponents'>Advanced components production efficiency</a></li>
            <li><a href='/#/blueprints/reaction'>Reaction production efficiency</a></li>
          </ul>
        </div>
        {this.props.children}
      </div>
    )
  }
}
