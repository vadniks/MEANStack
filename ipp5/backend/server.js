
const
    express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongodb = require("mongodb"),
    distDir = __dirname + '/../dist/',
    table = 'contacts',
    generatedJs = 'main.7ede472fb3587572.js',
    fs = require('fs'),
    port = process.argv[2],
    cors = require('cors')
let db, client

function patchPort() {
    console.log(port)
    const file = distDir + generatedJs
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) return console.log(err)
        const result = data.replace(
            /http:\/\/localhost:8080\/contacts/g,
            `https://__HIDDEN__.herokuapp.com/contacts`
        )
        fs.writeFile(file, result, 'utf8', (err) =>
        { if (err) return console.log(err) })
    })
}
patchPort()

app.use(bodyParser.json())
app.use(express.static(distDir))
app.use(cors())

mongodb.MongoClient.connect('mongodb+srv://admin:admin@__HIDDEN__.__HIDDEN__.mongodb.net/?retryWrites=true&w=majority', (err, $client) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }
    client = $client
    db = client.db("db")
    app.listen(port)
})

process.on('exit', () => client.closeSync())

function contactsCollection() { return db.collection(table) }
function toPlainId(objectId) { return objectId.toHexString() }
function mkId(id) { return new mongodb.ObjectId(id) }
function mkIdQuery(plainId) { return { _id: new mongodb.ObjectId(mkId(plainId)) } }
function getIdParam(request) { return request.params.id }
function patchContactId(contact) { contact._id = mkId(contact._id); return contact }

app.get("/contacts", (req , res) =>
    contactsCollection().find().toArray((err, contacts) =>
        res.send(err ? null : contacts.map(contact => {
            contact._id = toPlainId(contact._id); return contact
        })))
)
app.post("/contacts", (req , res) => {
    const contact = req.body
    contactsCollection().insertOne(contact, (err, $res) =>
        res.send($res.acknowledged ? contact : null))
})
app.put("/contacts/:id", (req , res) => {
    const contact = patchContactId(req.body)
    contactsCollection().updateOne(mkIdQuery(getIdParam(req)), { $set: contact }, (err, $res) =>
        res.send($res.acknowledged ? contact ? contact : null : null))
})
app.delete("/contacts/:id", (req , res) => {
    const id = getIdParam(req)
    contactsCollection().deleteOne(mkIdQuery(id), (err, $res) => {
        console.log($res.acknowledged + ' ' + id); res.send($res.acknowledged ? id : null)})
})
