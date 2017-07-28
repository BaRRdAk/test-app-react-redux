export const getPrice = () => dispatch => {

    let db = openDatabase("EVE", "0.1", "EVE Online price.", 200000)

    if (!db) {
      console.log('Failed to connect to database.')
    }
    
    let ferrogelRows = [];

    db.transaction(function(tx) {
      tx.executeSql("SELECT * FROM Price WHERE type_id = ? AND location_id = ? AND is_buy_order = ? ORDER BY price", [16683, 60003760, false], function(tx, result) {
        for (let row of result.rows) {
          ferrogelRows.push(row)
        }
        dispatch({ type: 'SHOW_PRICE', payload: ferrogelRows })
      }, null)
    })

}
