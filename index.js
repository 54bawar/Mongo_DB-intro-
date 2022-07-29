const MongoDB = require('mongodb').MongoClient;
const assert = require('assert');

const url = "mongodb://127.0.0.1:27017/";
const dbname = 'conFusion';

MongoDB.connect(url,(err,client)=>{
    assert.equal(err,null);
    console.log('Connected to the Server');

    const db = client.db(dbname);

    const collection = db.collection("dishes");

    collection.insertOne({"name":"Uthapizza","description":"Test"},
    (err,result)=>{
        assert.equal(err,null);
        console.log("After Insert:\n");
        console.log(result);

        collection.find({}).toArray((err,docs)=>{
            assert.equal(err,null);
            console.log('Found:\n');
            console.log(docs);

            db.dropCollection('dishes',(err,result)=>{
                assert.equal(err,null);
                client.close();
            });
        });
    });
});