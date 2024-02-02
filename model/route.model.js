import mongoose from 'mongoose';

const routeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},
{ timestamps: true} //this will create a timestamps automatically when update or new Model is created

)

const routeModel = mongoose.model('routes', routeSchema);
//create ccollection routes
//module.exports = mongoose.model('routes, routeSchema)   => the Model will be routes 
export default routeModel