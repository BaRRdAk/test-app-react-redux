import request from 'then-request'

export const importStaticData = () => dispatch => {

  dispatch({ type: 'IMPORT_STATIC_DATA', payload: 0 })

  const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  // const IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
  // const IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  let rqst = indexedDB.open("EVEStore", 1);

  let db;

  rqst.onupgradeneeded = function() {
    db = rqst.result;
    db.createObjectStore("blueprintStore", {keyPath: "blueprintTypeID"});
    db.createObjectStore("blueprintTypeIDsStore", {keyPath: "typeID"});

    let typeIDsStore = db.createObjectStore("typeIDsStore", {keyPath: "typeID"});
    typeIDsStore.createIndex("groupID", "groupID", {unique: false});

  };

  rqst.onerror = function(err){
    console.log(err);
  };

  rqst.onsuccess = function(){

    db = rqst.result;

    let blueprintStoreTransaction = db.transaction(["blueprintStore"], "readwrite");
    blueprintStoreTransaction.objectStore("blueprintStore").clear();

    request('GET', 'assets/api/blueprints.json', {json: true}).done((res)=> {

      let blueprints = JSON.parse(res.getBody());
      let i = 0
      for (let key in blueprints) {
        i++
        let transaction = db.transaction(["blueprintStore"], "readwrite");

        // transaction.oncomplete = function(event) {
        //   console.log("complete", event);
        // };
        //
        // transaction.onerror = function(event) {
        //   console.log("error", event);
        // };

        let blueprintStore = transaction.objectStore("blueprintStore");
        blueprintStore.add(blueprints[key])
      }

      dispatch({ type: 'IMPORT_STATIC_DATA', payload: i })
    })

    let blueprintTypeIDsStoreTransaction = db.transaction(["blueprintTypeIDsStore"], "readwrite");
    blueprintTypeIDsStoreTransaction.objectStore("blueprintTypeIDsStore").clear();

    request('GET', 'assets/api/blueprintTypeIDs.json', {json: true}).done((res)=> {

      let blueprintTypeIDs = JSON.parse(res.getBody());
      let i = 0
      for (let key in blueprintTypeIDs) {
        i++
        let transaction = db.transaction(["blueprintTypeIDsStore"], "readwrite");
        let blueprintTypeIDsStore = transaction.objectStore("blueprintTypeIDsStore");
        blueprintTypeIDs[key].typeID = parseInt(key)
        blueprintTypeIDsStore.add(blueprintTypeIDs[key])
      }

      dispatch({ type: 'IMPORT_STATIC_DATA', payload: i })
    })


    let typeIDsStoreTransaction = db.transaction(["typeIDsStore"], "readwrite");
    typeIDsStoreTransaction.objectStore("typeIDsStore").clear();

    request('GET', 'assets/api/typeIDs.json', {json: true}).done((res)=> {

      let typeIDs = JSON.parse(res.getBody());
      let i = 0
      for (let key in typeIDs) {
        i++
        let transaction = db.transaction(["typeIDsStore"], "readwrite");
        let typeIDsStore = transaction.objectStore("typeIDsStore");
        typeIDs[key].typeID = parseInt(key)
        typeIDsStore.add(typeIDs[key])
      }

      dispatch({ type: 'IMPORT_STATIC_DATA', payload: i })
    })

  }

}
