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
          {
            character.jobs.map((e, i) =>
                <div key={i}>
                  <img src={'https://image.eveonline.com/Type/' + e.product_type_id + '_32.png'} />{e.activity_id} {e.station_id} {new Date(e.end_date).toString()}
                </div>
            )
          }
        </div>

    )
  }
}
