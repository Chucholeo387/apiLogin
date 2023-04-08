const loginRouter = require ('./loginRoutes.js')
const registerRouter = require ('./registerRoutes.js')
const secretRouter = require ('./secretRoutes.js')
const secretRouter2 = require ('./secretRoutes2.js')
const testGraph = require ('./testGraph.js')



function routerApi(app){

    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/secretpage', secretRouter)
    app.use('/secretpage2', secretRouter2)
    app.use('/testgraph', testGraph)

}

module.exports = routerApi