import React from 'react'
import { connect } from 'react-redux'

import 'script-loader!highcharts/highstock.js'
import 'script-loader!highcharts/modules/exporting.js'

import PriceTable from '../../../components/price/moonmaterials/PriceTable'
import { getPrice } from '../actions/price'

class ComponentsPrice extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.onQuery(334, 60003760);
  }

  componentDidMount() {

    let db = openDatabase("EVE", "0.1", "EVE Online price.", 200000)

    if (!db) {
      console.log('Failed to connect to database.')
    }

    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    const IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

    let rqst = indexedDB.open("EVEStore", 1);

    rqst.onsuccess = function(){

      let typeIDsStoreTransaction = rqst.result.transaction(["typeIDsStore"], "readonly");
      let typeIDsStore = typeIDsStoreTransaction.objectStore("typeIDsStore");

      let myIndex = typeIDsStore.index('groupID');

      let keyRangeValue = IDBKeyRange.only(334)

      let priceByComponent = {}

      myIndex.openCursor(keyRangeValue).onsuccess = function(event) {

        let cursor = event.target.result;

        if(cursor) {
          let componentName = cursor.value.name.ru
          let componentTypeID = cursor.value.typeID


          db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM PriceHistory WHERE type_id = ? AND region_id = ? ORDER BY date", [componentTypeID, 10000002], function(tx, result) {

              let averagePrice = []
              let highestPrice = []
              let lowestPrice = []
              let volume = []
              let dataLength = result.rows.length

                  // set the allowed units for data grouping
              let groupingUnits = [[
                      'week',                         // unit name
                      [1]                             // allowed multiples
                  ], [
                      'month',
                      [1, 2, 3, 4, 6]
                  ]]


              for (let row of result.rows) {
                let myDate=String(row.date); //2016-07-22
                let date=myDate.split("-");
                let splitDate=date[1]+"/"+date[2]+"/"+date[0];
                let newDate = new Date(splitDate).getTime();

                averagePrice.push([
                    newDate,
                    row.average
                ]);

                volume.push([
                    newDate, // the date
                    row.volume // the volume
                ]);
              }

              Highcharts.stockChart('container-'+componentTypeID, {

                  rangeSelector: {
                      selected: 1
                  },

                  title: {
                      text: componentName+' Historical'
                  },

                  yAxis: [{
                      labels: {
                          align: 'right',
                          x: -3
                      },
                      title: {
                          text: 'average price'
                      },
                      height: '60%',
                      lineWidth: 2
                  }, {
                      labels: {
                          align: 'right',
                          x: -3
                      },
                      title: {
                          text: 'Volume'
                      },
                      top: '65%',
                      height: '35%',
                      offset: 0,
                      lineWidth: 2
                  }],

                  tooltip: {
                      split: true
                  },

                  series: [{
                      //type: 'candlestick',
                      name: 'average',
                      data: averagePrice,
                      dataGrouping: {
                          units: groupingUnits
                      }
                  }, {
                      type: 'column',
                      name: 'Volume',
                      data: volume,
                      yAxis: 1,
                      dataGrouping: {
                          units: groupingUnits
                      }
                  }]
              });

            }, null)
          })

          cursor.continue();

        }

      };

    }


  }

  mapObject(object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key]);
    });
  }

  render() {

    const { priceResult } = this.props.localState.priceStore;

    let priceComponentArray = []
    for (let key in priceResult) {
      let typeID
      if(priceResult[key].length > 0)
        typeID = priceResult[key][0].type_id

      priceComponentArray.push({name: key, typeID: typeID, price: priceResult[key]})
    }




    return (
      <div className="container-fluid">

      {
        priceComponentArray.map((e, i) =>
        <div key={i}>
          <h1>{e.name}</h1>
          <PriceTable data={e.price} />
          <div id={'container-'+e.typeID} style={{height: '400px', minWidth: '310px'}}></div>
        </div>
        )
      }
      </div>
    )

  }
};

export default connect(
  state => ({
    localState: state
  }),
  dispatch => ({
    onQuery: (group_id, location_id) => {
      dispatch(getPrice(group_id, location_id))
    }
  })
)(ComponentsPrice);
