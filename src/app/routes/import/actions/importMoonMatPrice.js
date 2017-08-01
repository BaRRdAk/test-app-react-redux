
import request from 'then-request'

export const importMoonMatPrice = () => dispatch => {

  dispatch({ type: 'IMPORT_PRICE_CLEAN', payload: null })

  let typeIDs = [16670,16671,16672,16673,16678,16679,16680,16681,16682,16683,17317,33359,33360,33361,33362]

  let regionId = 10000002


  let db = openDatabase("EVE", "0.1", "EVE Online price.", 200000)

  if (!db) {
    console.log('Failed to connect to database.')
  }

  //  история цен
  // request('GET', 'https://esi.tech.ccp.is/latest/markets/10000002/history/?datasource=tranquility&type_id=34', {json: true}).done((res)=> {
  //   this.setState({ array: JSON.parse(res.getBody()) });
  // })

  typeIDs.map((typeId) => {
    let url = `https://esi.tech.ccp.is/latest/markets/${regionId}/orders/?datasource=tranquility&order_type=all&type_id=${typeId}`

    let resArray = []

    //  ордера на покупку/продажу
    request('GET', url, {json: true}).done((res)=> {
      resArray = JSON.parse(res.getBody())

      db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Price (order_id REAL UNIQUE, type_id REAL, region_id REAL, location_id REAL, volume_total REAL, volume_remain REAL, min_volume REAL, price REAL, is_buy_order REAL, duration REAL, issued REAL, range TEXT)", [], null, null);
        tx.executeSql("DELETE FROM Price WHERE type_id = ? AND region_id = ?", [typeId, regionId], null, null);


        resArray.map((e) => {
            tx.executeSql("INSERT INTO Price (order_id, type_id, region_id, location_id, volume_total, volume_remain, min_volume, price, is_buy_order, duration, issued, range) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [e.order_id, e.type_id, regionId, e.location_id, e.volume_total, e.volume_remain, e.min_volume, e.price, e.is_buy_order, e.duration, e.issued, e.range], null, null);
            dispatch({ type: 'IMPORT_PRICE', payload: 1 })
        });

        // tx.executeSql("SELECT count(*) AS count FROM Price WHERE type_id = ? AND region_id = ?", [typeId, regionId], function(tx, result) {
        //   dispatch({ type: 'IMPORT_PRICE', payload: result.rows[0].count })
        // }, null)

        //dispatch({ type: 'IMPORT_PRICE', payload: resArray })
      });


    })
  })

}
