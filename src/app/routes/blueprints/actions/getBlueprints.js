
import request from 'then-request'

export const getBlueprints = () => dispatch => {

  let db = openDatabase("EVE", "0.1", "EVE Online price.", 200000)

  if (!db) {
    console.log('Failed to connect to database.')
  }


  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

  let rqst = indexedDB.open("EVEStore", 1);

  rqst.onsuccess = function(){

    let blueprintTypeIDsStoreTransaction = rqst.result.transaction(["blueprintTypeIDsStore"], "readonly");
    let blueprintTypeIDsStore = blueprintTypeIDsStoreTransaction.objectStore("blueprintTypeIDsStore");

    blueprintTypeIDsStore.getAll().onsuccess = function(event) {

      let blueprintTypeIDs = event.target.result;

      let blueprints = []

      blueprintTypeIDs.map((e) => {

        let blueprintStoreTransaction = rqst.result.transaction(["blueprintStore"], "readonly");
        let blueprintStore = blueprintStoreTransaction.objectStore("blueprintStore");

        blueprintStore.get(e.typeID).onsuccess = function(event) {
          let blueprint = event.target.result
          blueprint.name = e.name.en;

          let typeIDsStoreTransaction = rqst.result.transaction(["typeIDsStore"], "readonly");
          let typeIDsStore = typeIDsStoreTransaction.objectStore("typeIDsStore");

          typeIDsStore.get(blueprint.activities.manufacturing.products[0].typeID).onsuccess = function(event) {
            blueprint.activities.manufacturing.product = blueprint.activities.manufacturing.products[0]
            blueprint.activities.manufacturing.product.name = event.target.result.name.en;

            let locationID = 60003760;

            db.transaction(function(tx) {
              tx.executeSql("SELECT price FROM Price WHERE type_id = ? AND location_id = ? AND is_buy_order = ? ORDER BY price LIMIT 1", [blueprint.activities.manufacturing.products[0].typeID, locationID, false], function(tx, result) {

                for (let row of result.rows) {
                  blueprint.activities.manufacturing.product.price = row.price
                }
                dispatch({ type: 'SHOW_BLUEPRINTS', payload: blueprints })
              }, null)
            })

            blueprint.activities.manufacturing.materials.map((e) => {
              typeIDsStore.get(e.typeID).onsuccess = function(event) {
                e.name = event.target.result.name.en;
                db.transaction(function(tx) {
                  tx.executeSql("SELECT price FROM Price WHERE type_id = ? AND location_id = ? AND is_buy_order = ? ORDER BY price LIMIT 1", [e.typeID, locationID, false], function(tx, result) {

                    for (let row of result.rows) {
                      e.price = row.price
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

      })

    };

  }

}
