const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = process.env.PORT || 8000
require('dotenv').config()


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'sbr'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/',(request, response)=>{
    db.collection('sbrCharacters').find().sort({likesS: -1}).toArray()
    .then(data => {
        response.render('index.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

app.post('/addSbrCharacter', (request, response) => {
    db.collection('sbrCharacters').insertOne({cName: request.body.cName, aNumber: request.body.aNumber,
    sName: request.body.sName, hName: request.body.hName, likesS: 0})
    .then(result => {
        console.log('Character Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/addOneLike', (request, response) => {
    db.collection('sbrCharacters').updateOne({cName: request.body.cName, aNumber: request.body.aNumber, sName: request.body.sName, hName: request.body.hName, likesS: request.body.likesS},{
        $set: {
            likesS:request.body.likesS + 1
          }
    },{
        sort: {_id: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        response.json('Like Added')
    })
    .catch(error => console.error(error))

})

app.delete('/deleteCharacter', (request, response) => {
    db.collection('sbrCharacters').deleteOne({cName: request.body.cName})
    .then(result => {
        console.log('Character Deleted')
        response.json('Character Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=> {
    console.log(`The next Holy Corpse Part is currently on port ${PORT}! Better track it down!`)
})