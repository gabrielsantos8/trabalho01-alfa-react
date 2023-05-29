const path = require('path')

const jsonServer = require('json-server')

const server = jsonServer.create()

const router = jsonServer.router(
    path.join(__dirname, 'db.json')
)

const middlewares = jsonServer.defaults()

server.use(
    jsonServer.rewriter({
        '/api/*':'/$1'
    })
)

server.use(middlewares)
server.use(router)

server.listen(3001, () => {
    console.log('JSON Server iniciou com sucesso :D')
})
