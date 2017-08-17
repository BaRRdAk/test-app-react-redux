
import request from 'then-request'

export const importPriceHistory = (regionId) => dispatch => {

  dispatch({ type: 'IMPORT_PRICE_HISTORY_CLEAN', payload: null })

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

        let url = `https://esi.tech.ccp.is/latest/markets/${regionId}/history/?datasource=tranquility&type_id=${typeId}`

        // история цен
        request('GET', url, {json: true}).done((res)=> {
          let resArray = JSON.parse(res.getBody())

          db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS PriceHistory (type_id REAL, region_id REAL, date REAL, order_count REAL, volume REAL, highest REAL, average REAL, lowest REAL)", [], null, null);
            tx.executeSql("DELETE FROM PriceHistory WHERE type_id = ? AND region_id = ?", [typeId, regionId], null, null);

            resArray.map((e) => {
                tx.executeSql("INSERT INTO PriceHistory (type_id, region_id, date, order_count, volume, highest, average, lowest) values(?, ?, ?, ?, ?, ?, ?, ?)", [typeId, regionId, e.date, e.order_count, e.volume, e.highest, e.average, e.lowest], null, null);
                dispatch({ type: 'IMPORT_PRICE_HISTORY', payload: 1 })
            });

          });

        })

      })

    };

  }

}
