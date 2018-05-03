import React from 'react'

export default class Layout extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">Calc</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><a href='/#/import'>Import orders</a></li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Price history <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href='/#/price/moonmat'>Advanced moon materials</a></li>
                    <li><a href='/#/price/component'>Advanced components</a></li>
                  </ul>
                </li>
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Production efficiency <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href='/#/blueprints/advancedComponents'>Advanced components</a></li>
                    <li><a href='/#/blueprints/compositeReaction'>Composite reaction</a></li>
                    <li><a href='/#/blueprints/polimerReaction'>Polimer reaction</a></li>
                    <li><a href='/#/blueprints/bioReaction'>Bio reaction</a></li>
                  </ul>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a href='/#/dashboard'>login</a></li>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
