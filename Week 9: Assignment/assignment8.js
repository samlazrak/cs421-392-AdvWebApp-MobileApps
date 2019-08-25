var open = indexedDB.open("TheDatabase", 1);

open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    var index = store.createIndex("Index", ["index.name", "index.email", "index.bio"]);
};

open.onsuccess = function() {
    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");
    var index = store.index("Index");

    store.put({id: 2, name: "Timmy", email: "timmy@gmail.com", bio: "Hi I'm Timmy"});
    store.put({id: 3, name: "Tommy", email: "tommy@gmail.com", bio: "Hi I'm Tommy"});
    
    var getTimmy = store.get(2);

    getTimmy.onsuccess = function() {
        console.log(getTimmy.result);
    };

    tx.oncomplete = function() {
        db.close();
    };
}