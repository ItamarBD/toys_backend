const mongoService = require('./mongo-service')
const TOYS_COLLECTION = 'toys'
const ObjectId = require('mongodb').ObjectId;

function query() {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(TOYS_COLLECTION);
            return collection.find({}).toArray()
        })
}

function remove(toyId) {
    toyId = new Object(toyId)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(TOYS_COLLECTION);
            return collection.remove({ _id: toyId })
        })
}

function getById(toyId) {
    console.log('555555555',toyId)
    // toyId = new ObjectId(toyId)
    var tttoyId = new ObjectId(toyId)

    console.log('9955555555 toyId',tttoyId)

    return mongoService.connect()
        .then(db => {
            const collection = db.collection('toys');
            return collection.findOne({ _id: tttoyId })
        })
}

function add(toy) {
    return mongoService.connect()
        .then(db => {
            const collection = db.collection(TOYS_COLLECTION);
            return collection.insertOne(toy)
                .then(result => {
                    toy._id = result.insertedId;
                    return toy;
                })
        })
}

function update(toy) {
    toy._id = new Object(toy._id)
    return mongoService.connect()
        .then(db => {
            const collection = db.collection('toy');
            return collection.updateOne({ _id: toy._id }, { $set: toy })
                .then(result => {
                    return toy;
                })
        })
}

module.exports = {
    query,
    remove,
    getById,
    add,
    update
}