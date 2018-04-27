
import request from 'then-request'

export const getReactionBlueprints = (blueprintsGroupID, locationID, systemProductionIndex) => dispatch => {

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

    let reactionBlueprints = [];

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

          typeIDsStore.get(blueprint.activities.reaction.products[0].typeID).onsuccess = function(event) {
            blueprint.activities.reaction.product = blueprint.activities.reaction.products[0]
            blueprint.activities.reaction.product.name = event.target.result.name.en;
            blueprint.activities.reaction.product.groupID = event.target.result.groupID;
            blueprint.activities.reaction.product.basePrice = event.target.result.basePrice;
            blueprint.activities.reaction.product.profitableMarket = 0

            db.transaction(function(tx) {
              tx.executeSql("SELECT price FROM Price WHERE type_id = ? AND location_id = ? AND is_buy_order = ? ORDER BY price LIMIT 1", [blueprint.activities.reaction.products[0].typeID, locationID, false], function(tx, result) {

                for (let row of result.rows) {
                  blueprint.activities.reaction.product.price = row.price
                }
                dispatch({ type: 'SHOW_REACTION_BLUEPRINTS', payload: reactionBlueprints })
              }, null)
            })

            db.transaction(function(tx) {
              tx.executeSql("SELECT price FROM Price WHERE type_id = ? AND location_id = ? AND is_buy_order = ? ORDER BY price DESC LIMIT 1", [blueprint.activities.reaction.products[0].typeID, locationID, true], function(tx, result) {

                for (let row of result.rows) {
                  blueprint.activities.reaction.product.buy_price = row.price

                  let minPrice = row.price - row.price/100*2

                  db.transaction(function(tx) {
                    tx.executeSql("SELECT volume_remain FROM Price WHERE type_id = ? AND location_id = ? AND is_buy_order = ? AND price > ?", [blueprint.activities.reaction.product.typeID, locationID, true, minPrice], function(tx, result) {

                      for (let row of result.rows) {
                        blueprint.activities.reaction.product.profitableMarket += row.volume_remain
                      }
                      dispatch({ type: 'SHOW_REACTION_BLUEPRINTS', payload: reactionBlueprints })
                    }, null)
                  })


                }
                dispatch({ type: 'SHOW_REACTION_BLUEPRINTS', payload: reactionBlueprints })
              }, null)
            })

            blueprint.activities.reaction.materials.map((e) => {
              typeIDsStore.get(e.typeID).onsuccess = function(event) {
                e.name = event.target.result.name.en;
                db.transaction(function(tx) {
                  tx.executeSql("SELECT price FROM Price WHERE type_id = ? AND location_id = ? AND is_buy_order = ? ORDER BY price LIMIT 1", [e.typeID, locationID, false], function(tx, result) {

                    for (let row of result.rows) {
                      e.price = row.price
                    }
                    dispatch({ type: 'SHOW_REACTION_BLUEPRINTS', payload: reactionBlueprints })
                  }, null)
                })

                dispatch({ type: 'SHOW_REACTION_BLUEPRINTS', payload: reactionBlueprints })
              }
            })

            reactionBlueprints.push(blueprint)
            dispatch({ type: 'SHOW_REACTION_BLUEPRINTS', payload: reactionBlueprints })
          }

        };

        cursor.continue();

      }

    }

  }

}
