
import request from 'then-request'

export const importPrice = () => dispatch => {

  dispatch({ type: 'IMPORT_PRICE_CLEAN', payload: null })

  let regionId = 10000002

  let db = openDatabase("EVE", "0.1", "EVE Online price.", 200000)

  if (!db) {
    console.log('Failed to connect to database.')
  }

  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

  let rqst = indexedDB.open("EVEStore", 1);

  rqst.onsuccess = function(){

    let typeIDsStoreTransaction = rqst.result.transaction(["typeIDsStore"], "readonly");
    let typeIDsStore = typeIDsStoreTransaction.objectStore("typeIDsStore");

    typeIDsStore.getAllKeys().onsuccess = function(event) {

      event.target.result.map((typeId) => {

        let url = `https://esi.tech.ccp.is/latest/markets/${regionId}/orders/?datasource=tranquility&order_type=all&type_id=${typeId}`

        //  ордера на покупку/продажу
        request('GET', url, {json: true}).done((res)=> {
          let resArray = JSON.parse(res.getBody())

          db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Price (order_id REAL UNIQUE, type_id REAL, region_id REAL, location_id REAL, volume_total REAL, volume_remain REAL, min_volume REAL, price REAL, is_buy_order REAL, duration REAL, issued REAL, range TEXT)", [], null, null);
            tx.executeSql("DELETE FROM Price WHERE type_id = ? AND region_id = ?", [typeId, regionId], null, null);

            resArray.map((e) => {
                tx.executeSql("INSERT INTO Price (order_id, type_id, region_id, location_id, volume_total, volume_remain, min_volume, price, is_buy_order, duration, issued, range) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [e.order_id, e.type_id, regionId, e.location_id, e.volume_total, e.volume_remain, e.min_volume, e.price, e.is_buy_order, e.duration, e.issued, e.range], null, null);
                dispatch({ type: 'IMPORT_PRICE', payload: 1 })
            });

          });

        })

      })

    };

  }

  //  история цен
  // request('GET', 'https://esi.tech.ccp.is/latest/markets/10000002/history/?datasource=tranquility&type_id=34', {json: true}).done((res)=> {
  //   this.setState({ array: JSON.parse(res.getBody()) });
  // })

}
