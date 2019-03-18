const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const monk = require('monk')
const MongoClient = require('mongodb').MongoClient;
app.use(cors())
app.use(bodyParser.json())

/// Connection to database
const uri = "mongodb+srv://mddever:Password@cluster0-hiisr.gcp.mongodb.net/ReactExpress?retryWrites=true";
/// Database Name
const DB_Name = 'ReactExpress'
const getCollection = async (collection) => {
const client = await MongoClient.connect(uri)
return client.db(DB_Name).collection(collection);
};

const client = new MongoClient(uri, {useNewUrlParser: true});
client.connect (err => {
    const collection = client.db('ReactExpress').collection('People');
    return collection;
    client.close();
})


app.get('/', async (req, res) => {
    const collection = await getCollection('People')
    const cursor = await collection.find({})
    const results = await cursor.toArray()
    return res.status(200).send(results)
    })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//// POST METHOD
const assert = require('assert');

const url = "mongodb+srv://mddever:Password@cluster0-hiisr.gcp.mongodb.net/ReactExpress?retryWrites=true"

/// Create a new MongoClient
const client2 = new MongoClient(url, {useNewUrlParser: true});

/// use connect method to connect to server
client2.connect(function(err,client2) {
    assert.equal(null, err);
    console.log("lets post stuff");

const db = client2.db(DB_Name);

// insert a single document
db.collection('People').insertOne({a: "Test 1"}, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);

    // insert multiple documents
    db.collection('People').insertMany([{a:"Test 2", d: "second point"},{b:"String3"},{c:"String4"}], function(err, r) {
        assert.equal(null, err);
        /// if an assert equal statement is posted, it will require the total objects inserted in the 
        /// insertMany method exactly matches the assert.equal.
        /// I have commented it out below due to my testing
        
        
        ///assert.equal(3, r.insertedCount);

        client2.close();
    });
});

});

//// I'm pretty sure that I need to add an async / await in to this post, but I'm not sure as to where.
/// as it stands, when this is run on the server, it immediately posts to the mongo but doesn't allow
/// me to post to mongo when I want to through postman.