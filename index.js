const express=require('express')
const app=express()
const cors=require('cors')
const{MongoClient}=require('mongodb')
require("dotenv").config();
const port=process.env.PORT || 5000
//  using middleware
app.use(cors())
app.use(express.json())
// database connect
const uri =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.aicgl.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// create a client connection
async function run() {
    try {
      // Connect the client to the server
      await client.connect();
      console.log('database connected')
      const database = client.db('Travel-Adventure');
    const eventsCollection = database.collection('adventures');
    // add item
    app.post('/addItem', async(req,res)=>{
        const events=req.body
        console.log(events)
        const insertedResult=await eventsCollection.insertOne(events)
    })
    // load allevents
    app.get('/allevents', async(req,res)=>{
        const getEvents=await eventsCollection.find({}).toArray();
        res.json(getEvents)
    })
     
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('welcome to travel adventure')
})
// server listening
app.listen(port,()=>{
    console.log('server is running')
})