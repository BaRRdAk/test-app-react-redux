
import request from 'then-request'

export const getAdvancedComponentsMixBlueprints = (blueprintsGroupID, systemProductionIndex) => dispatch => {

  let domainRegionId = 10000043
  let jitaHubId = 60003760
  let ammarHubId = 60008494

  dispatch({ type: 'SYSTEM_INDEX', payload: systemProductionIndex })

  let db = openDatabase("EVE", "0.1", "EVE Online price.", 200000)

  if (!db) {
    console.log('Failed to connect to database.')
  }


  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

  let rqst = indexedDB.open("EVEStore", 1);

  rqst.onsuccess = function(){

    let blueprintTypeIDsStoreTransaction = rqst.result.transaction(["blueprintTypeIDsStore"], "readonly");
    let blueprintTypeIDsStore = blueprintTypeIDsStoreTransaction.objectStore("blueprintTypeIDsStore");

    let myIndex = blueprintTypeIDsStore.index('groupID');

    let keyRangeValue = IDBKeyRange.only(blueprintsGroupID);

    let blueprints = [];

    myIndex.openCursor(keyRangeValue).onsuccess = function(event) {

      let cursor = event.target.result;

      if(cursor) {

        let blueprintTypeID = cursor.value;

        let blueprintStoreTransaction = rqst.result.transaction(["blueprintStore"], "readonly");
        let blueprintStore = blueprintStoreTransaction.objectStore("blueprintStore");

        blueprintStore.get(blueprintTypeID.typeID).onsuccess = function(event) {
          let blueprint = event.target.result
          blueprint.name = blueprintTypeID.name.en;
          blueprint.marketGroupID = blueprintTypeID.marketGroupID;
          blueprint.groupID = blueprintTypeID.groupID;

          let typeIDsStoreTransaction = rqst.result.transaction(["typeIDsStore"], "readonly");
          let typeIDsStore = typeIDsStoreTransaction.objectStore("typeIDsStore");

          typeIDsStore.get(blueprint.activities.manufacturing.products[0].typeID).onsuccess = function(event) {
            blueprint.activities.manufacturing.product = blueprint.activities.manufacturing.products[0]
            blueprint.activities.manufacturing.product.name = event.target.result.name.en;
            blueprint.activities.manufacturing.product.profitableMarket = 0
            blueprint.activities.manufacturing.product.basePrice = event.target.result.basePrice;

            db.transaction(function(tx) {
              tx.executeSql("SELECT price FROM Price WHERE type_id = ? AND location_id = ? AND is_buy_order = ? ORDER BY price LIMIT 1", [blueprint.activities.manufacturing.products[0].typeID, ammarHubId, false], function(tx, result) {

                for (let row of result.rows) {
                  blueprint.activities.manufacturing.product.price = row.price
                }
                dispatch({ type: 'SHOW_BLUEPRINTS', payload: blueprints })
              }, null)
            })

            db.transaction(function(tx) {
              tx.executeSql("SELECT price FROM Price WHERE type_id = ? AND location_id = ? AND is_buy_order = ? ORDER BY price DESC LIMIT 1", [blueprint.activities.manufacturing.products[0].typeID, ammarHubId, true], function(tx, result) {

                for (let row of result.rows) {
                  blueprint.activities.manufacturing.product.buy_price = row.price

                  let minPrice = row.price - row.price/100*2

                  db.transaction(function(tx) {
                    tx.executeSql("SELECT volume_remain FROM Price WHERE type_id = ? AND location_id = ? AND is_buy_order = ? AND price > ?", [blueprint.activities.manufacturing.product.typeID, ammarHubId, true, minPrice], function(tx, result) {

                      for (let row of result.rows) {
                        blueprint.activities.manufacturing.product.profitableMarket += row.volume_remain
                      }
                      dispatch({ type: 'SHOW_BLUEPRINTS', payload: blueprints })
                    }, null)
                  })

                }

                dispatch({ type: 'SHOW_BLUEPRINTS', payload: blueprints })
              }, null)

            })

            blueprint.activities.manufacturing.materials.map((e) => {
              typeIDsStore.get(e.typeID).onsuccess = function(event) {
                e.name = event.target.result.name.en;
                db.transaction(function(tx) {
                  tx.executeSql("SELECT price, region_id FROM Price WHERE type_id = ? AND (location_id = ? OR region_id = ?) AND is_buy_order = ? ORDER BY price LIMIT 1", [e.typeID, jitaHubId, domainRegionId, false], function(tx, result) {

                    for (let row of result.rows) {
                      e.price = row.price
                      e.region_id = row.region_id

                      if(parseInt(row.region_id) == 10000043){
                        e.region_name = "(Domain)"
                      } else if (row.region_id == 10000002){
                        e.region_name = "(Jita)" }
                    }
                    dispatch({ type: 'SHOW_BLUEPRINTS', payload: blueprints })
                  }, null)
                })

                dispatch({ type: 'SHOW_BLUEPRINTS', payload: blueprints })
              }
            })

            blueprints.push(blueprint)
            dispatch({ type: 'SHOW_BLUEPRINTS', payload: blueprints })
          }

        };

        cursor.continue();

      }

    }

  }

}
