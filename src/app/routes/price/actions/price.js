export const getPrice = (group_id, location_id) => dispatch => {

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

    let keyRangeValue = IDBKeyRange.only(group_id)

    let priceByMaterial = {}

    myIndex.openCursor(keyRangeValue).onsuccess = function(event) {
      let cursor = event.target.result;

      if(cursor) {
        let materialName = cursor.value.name.ru
        let materialTypeID = cursor.value.typeID
        priceByMaterial[materialName] = []

        db.transaction(function(tx) {
          tx.executeSql("SELECT * FROM Price WHERE type_id = ? AND location_id = ? AND is_buy_order = ? ORDER BY price LIMIT 1", [materialTypeID, location_id, false], function(tx, result) {

            for (let row of result.rows) {
              priceByMaterial[materialName].push(row)
            }

            dispatch({ type: 'SHOW_PRICE', payload: priceByMaterial })
          }, null)
        })

        cursor.continue();
      }

    };

  }

}
