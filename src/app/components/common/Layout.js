import React from 'react'

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ul>
            <li><a href='/#/dashboard'>dashboard</a></li>
            <li><a href='/#/import'>import price</a></li>
            <li><a href='/#/price/all'>price all moonmat</a></li>
            <li><a href='/#/blueprints/info'>blueprints info</a></li>
          </ul>
        </div>
        {this.props.children}
      </div>
    )
  }
}
