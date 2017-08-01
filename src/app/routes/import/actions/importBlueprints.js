import request from 'then-request'

export const importBlueprints = () => dispatch => {

  dispatch({ type: 'IMPORT_BLUEPRINTS', payload: 0 })

  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  // const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  // const IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  let rqst = indexedDB.open("EVEStore", 1);

  let db;

  rqst.onupgradeneeded = function() {
    db = rqst.result;
    db.createObjectStore("blueprintStore", {keyPath: "blueprintTypeID"});
    //var titleIndex = store.createIndex("name", "name", {unique: true});
  };

  rqst.onerror = function(err){
    console.log(err);
  };

  rqst.onsuccess = function(){
    db = rqst.result;
    let transaction = db.transaction(["blueprintStore"], "readwrite");
    transaction.objectStore("blueprintStore").clear();

    request('GET', 'assets/api/blueprints.json', {json: true}).done((res)=> {

      let blueprints = JSON.parse(res.getBody());

      let i = 0

      for (let key in blueprints) {
        i++

        let transaction = db.transaction(["blueprintStore"], "readwrite");

        // transaction.oncomplete = function(event) {
        //   console.log(event);
        // };
        //
        // transaction.onerror = function(event) {
        //   console.log(event);
        // };

        let blueprintStore = transaction.objectStore("blueprintStore");

        blueprintStore.add(blueprints[key])
      }

      dispatch({ type: 'IMPORT_BLUEPRINTS', payload: i })

    })

  }

}
