const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// e.g. tinyurl.com 
const hostName = 'localhost'
const port = 3000;
// I was using mongo so enter your database base
const dbName = 'xxxx';
const collection = 'xxxx'


// Database connection string
const mongoURI = 'xxxxx'
const client = new MongoClient(mongoURI)


app.get('/', (req, res) => {
    res.send("Health Check")
})

/**
 * @Param: id the id of the short URL
 */
app.get('/:id', (req, res, next) => {
     id = req.params.id;
    // console.log(id);
    client.connect();
    client.db(dbName).collection(collection).findOne({"_id":ObjectId(id)}).then(
        (el,err)=>{
            console.log("redirecting ",el.original_URL.toString())
            res.redirect(301,`https://${el.original_URL.toString()}`)
        }
    )

})

/**
 * @post
 * @body : {"origionalURL":"www.example.com/ReallyLongURLString"}
 */
app.post('/', (req, res) => {
    console.log(req.body)
    var obj = {
        original_URL: req.body.original_URL
    }
    client.db(dbName).collection(collection).insertOne(obj).then((response, err) => {
        if (!err) {
            console.log(response.insertedId.toString())
            res.status(200).send(`${hostName}/${response.insertedId.toString()}`)
        }
        else(
            res.status(501).send("Internal Server Error")
        )
    })
    //@TODO: Check
    // res.send("OK")

})

/**
 * Listen on port 
*/
app.listen(port, async () => {
    console.log(`Server on localhost:${port}`);
    await client.connect();
    console.log("db connected")

})

