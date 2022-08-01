const MongoDB = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = "mongodb://127.0.0.1:27017/";
const dbname = 'conFusion';


/*
MongoDB.connect(url,(err,client)=>{
    assert.equal(err,null);
    console.log('Connected to the Server');

    const db = client.db(dbname);
 
    dboper.insertDocument(db,{name:"UthaPizza",description:"Test"},"dishes",(result)=>{
        console.log("Inserted Document ", result);

        dboper.findDocuments(db,"dishes",(result)=>{
            console.log("Found Document ",result);
            
            dboper.updateDocument(db,{name:"UthaPizza",description:"Test"},{name:"Vandout",description:"Vandout"},"dishes",(result)=>{
                console.log("updated Document ",result);

                dboper.findDocuments(db,"dishes",(result)=>{
                    console.log("Found Updated Documents", result);
                    
                    db.dropCollection("dishes",(result)=>{
                        console.log("Dropped Collection ", result);
                        client.close();
                    });
                });
            });
        });
    }); 
});

*/


MongoDB.connect(url).then((client)=>{
    console.log("Connected to the Server");
    const db = client.db(dbname);

    dboper.insertDocument(db,{name:"UthaPizza",description:"Test"},"dishes").then((result)=>{    
        console.log("Inserted Document ", result);
        return dboper.findDocuments(db,"dishes");
    }).then((docs)=>{
        console.log("Found Documents ",docs);

        return dboper.updateDocument(db,{name:"UthaPizza",
        description:"Test"},{name:"Vandout",description:"Testing Vandout"},"dishes");

    }).then((result)=>{
        console.log("updated Document ",result);
        return dboper.findDocuments(db,"dishes");
    }).then((docs)=>{
        console.log("Found Updated Documents", docs);
        return db.dropCollection("dishes");
    }).then((result)=>{
        console.log("Dropped Collection ", result);
        return client.close();
    }).catch((err)=>{
        console.log(err);
    });
}).catch((err)=>{
    console.log(err);
})