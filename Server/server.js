require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')

const {mongoose} = require('./db/mongoose')
const {Access} = require('./models/access.js')

const app = express()
const port = process.env.PORT || 3000

var cors = require('cors');

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}));

app.use(bodyParser.json())

app.get('/test', (req, res) => {
    res.send('{\'ok\': true}')
})

app.post('/connection/:accessId', (req, res) => {
    
    var accessId = req.params.accessId
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    var userAgent = req.get('User-Agent')
    var now = new Date().getTime()

    let query = {
        "ip": ip,
        "accessId": accessId
    }

    Access.findOne(query, function(error, access) {

        if (error) {
            res.status(500).send(error)
        } else if (access) {

            Access.findOneAndUpdate(query, {
                "lastAccess": now,
                "accessCount": access.accessCount + 1
            }, {new: true}, function(error, doc) {
                if (error) {
                    res.status(400).send(error)
                } else {
                    res.status(200).send(doc)
                }
            });
        } else {

            let access = new Access({
                ip: ip,
                accessId: accessId,
                userAgent: userAgent,
                createdAt: now,
                lastAccess: now,
                accessCount: 0
            })

            access.save().then((doc) => {
                res.status(201).send(access)
            }, (error) => {
                res.status(400).send(error)
            })
        }
    })
})

app.get('/connection/:accessId', (req, res) => {

    var accessId = req.params.accessId

    let findQuery = {
        ip: 1,
        accessId: 1,
        userAgent: 1,
        createdAt: 1,
        lastAccess: 1,
        accessCount: 1
    }

    Access.find({"accessId": accessId}, findQuery).sort('-createdAt').then((hits) => {
        res.send(hits)
    })
})

app.listen(port, () => {
    console.log(`Starting on port ${port}`)
})

module.exports = {app}
