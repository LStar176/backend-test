import { router } from "./routes.js"
const routes =[
    {
        path: '/route',
        router: router
    }
]

const routerFactory =  (server)=>{
    routes.map(  route => {
         server.use(route.path, route.router)
    })
}

export default routerFactory