const toyService = require('../services/toy-service.js')

function addToyRoutes(app) {

    //list
    app.get('/toy', (req, res) => {
        console.log('get all toys')
        toyService.query()
            .then(toys => res.json(toys))
    })

    //single
    app.get('/toy/:toyId', (req, res) => {
        const toyId = req.params.toyId;
        console.log('wwwww',req.params)
        console.log('wwwww',req.params.toyId)
        toyService.getById(toyId)
            .then(toy => res.json(toy))
    })


    //delete
    app.delete('/toy/:toyId', (req, res) => {
        const toyId = req.params.toyId;
        toyService.remove(toyId)
            .then(() => res.end(`toy ${toyId} deleted`))
    })

    //create
    app.post('/toy', (req, res) => {
        const toy = req.body;
        toyService.add(toy)
            .then(toy => {
                res.json(toy)
            })
    })

    //update
    app.put('/toy/:toyId', (req, res) => {
        const toy = req.body;
        toyService.update(toy)
            .then(toy => res.json(toy))
    })
}

module.exports = addToyRoutes;