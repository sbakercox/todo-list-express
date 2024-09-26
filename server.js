//Import the nessecary modules for this app
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()

//These are declarations for the database, database enviornment and name
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo'

// Establish a connection to the database and console log a confirmation
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

// Letting backend know we are going to be using ejs
app.set('view engine', 'ejs')
// Letting backend know the location of static data (css & js)
app.use(express.static('public'))
// Gets request data from form
app.use(express.urlencoded({ extended: true }))
// letting backend know we are using json
app.use(express.json())


app.get('/',async (request, response)=>{
// a list of all the items in your DB    
    const todoItems = await db.collection('todos').find().toArray()
// a count of all the items in your DB that have a property of completed: false    
    const itemsLeft = await db.collection('todos').countDocuments({completed: false})
// passes the variables we just called for into ejs    
    response.render('index.ejs', { items: todoItems, left: itemsLeft })
// this is a fetch method of doing the same thing the async await is doing just commented out    
    db.collection('todos').find().toArray()
    .then(data => {
        db.collection('todos').countDocuments({completed: false})
        .then(itemsLeft => {
            response.render('index.ejs', { items: data, left: itemsLeft })
        })
    })
    .catch(error => console.error(error))
})

app.post('/addTodo', (request, response) => {
//insert a new object into our todo DB with 2 properties, "thing" from the form and "complete" which is defaulted to false    
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
//once post is successfully completed, "todo added" is console logged as confirmation and then refresh the page    
        .then(result => {
        console.log('Todo Added')
        response.redirect('/')
    })
//logs any errors, if found    
    .catch(error => console.error(error))
})

app.put('/markComplete', (request, response) => {
// respond to JS interaction and updates database object changing the "completed" property to true     
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: true
          }
    },{
// Reorders the list within the db in descending order        
        sort: {_id: -1},
// Lets DB know to not create a new object if one didn't exist prior        
        upsert: false
    })
// this is the confirmation response to the client side JS    
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
//logs any errors, if found    
    .catch(error => console.error(error))

})

app.put('/markUnComplete', (request, response) => {
// respond to JS interaction and updates database object changing the "completed" property to false     
    db.collection('todos').updateOne({thing: request.body.itemFromJS},{
        $set: {
            completed: false
          }
    },{
// Reorders the list within the db in descending order         
        sort: {_id: -1},
// Lets DB know to not create a new object if one didn't exist prior        
        upsert: false
    })
// this is the confirmation response to the client side JS    
    .then(result => {
        console.log('Marked Complete')
        response.json('Marked Complete')
    })
//logs any errors, if found    
    .catch(error => console.error(error))

})

app.delete('/deleteItem', (request, response) => {
// respond to JS interaction and delete database object     
    db.collection('todos').deleteOne({thing: request.body.itemFromJS})
// this is the confirmation response to the client side JS     
    .then(result => {
        console.log('Todo Deleted')
        response.json('Todo Deleted')
    })
//logs any errors, if found    
    .catch(error => console.error(error))

})
// lets us know which port the site is running on 
app.listen(process.env.PORT || PORT, ()=>{
// this is the confirmation of the port and its state    
    console.log(`Server running on port ${PORT}`)
})
