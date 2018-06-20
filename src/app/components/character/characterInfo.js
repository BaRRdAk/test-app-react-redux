import React from 'react'

export default class CharacterInfo extends React.Component {

  componentDidMount = () => {

  }
  componentWillReceiveProps = () => {

  }


  render() {
    //количество продукции
    let character = this.props.data;

console.log(character);

    return (

        <div>
          <div>
            {character.wallet}
          </div>
          <h3>JOBS</h3>
          {
            character.jobs.map((e, i) =>
                <div className="row" key={i}>
                  <div className="col-md-2">
                    <img src={'https://image.eveonline.com/Type/' + e.product_type_id + '_32.png'} />
                  </div>
                  <div className="col-md-2">
                    {e.activity_id}
                  </div>
                  <div className="col-md-2">
                    {e.station_id}
                  </div>
                  <div className="col-md-2">
                    {new Date(e.end_date).toLocaleDateString()}
                  </div>
                  <div className="col-md-2">
                    {new Date(e.end_date).toLocaleTimeString()}
                  </div>
                </div>
            )
          }
          <h3>ORDERS</h3>
          {
            character.orders.map((e, i) =>
              <div className="row" key={i}>
                <div className="col-md-2">
                  <img src={'https://image.eveonline.com/Type/' + e.type_id + '_32.png'} />
                </div>
                <div className="col-md-2">
                  {e.location_id}
                </div>
                <div className="col-md-2">
                  {e.volume_remain}
                </div>
                <div className="col-md-2">
                  {e.volume_total}
                </div>
                <div className="col-md-2">
                  {e.price}
                </div>
                <div className="col-md-2">
                  {new Date(e.issued).toLocaleDateString()}
                </div>
              </div>
            )
          }
        </div>

    )
  }
}
