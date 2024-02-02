import routeModel from "../model/route.model.js";
import mongoose from 'mongoose';

const getData = async (req,res)=>{
    try {
        const getData = await routeModel.find({}).sort({updateAt:1})
        if(!getData) throw {
            status: 400,
            message: "No route found"
        }
        res.status(200).send(getData)
    } catch (error) {
        res.status(error.status || 500).send({error:error.message} ||{error: error.message})
    }
}

const getDataById = async (req,res)=>{
    try {
        //Check the Id - parameter of isValid is Object{id: String} || Number
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: 400,
            message: "Id is invalid"
        }
        //parameter in find() must be an object
        const getData = await routeModel.findOne({_id: req.params.id})

        //check data is valid
        if(!getData) throw {
            status: 400,
            message: "No route found"
        }
        res.status(200).send(getData)
    } catch (error) {
        res.status(error.status || 500).send({error:error.message} ||{error: error.message})
    }
}

const postData = async (req,res)=>{
    try {
        const {title, content} = req.body
        let emptyField =[]
        if(!title) emptyField.push('title')
        if(!content) emptyField.push('content')
        if(emptyField.length > 0) {
          return res.status(400).send({error: "error roi kia",emptyField})
        }

        const newRoute = await routeModel.create({title, content})
        res.status(200).send(newRoute)
    } catch (error) {
        res.status(500).send(error.message)
    }
    // res.send({message: 'POST data'}) // should in the ty catch to prevent error crashing the servere
}

const deleteDataById = async (req,res)=>{
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
            status: 400,
            message: "ID is invalid"
        }
        //find to  
        const deleteData = await routeModel.findOneAndDelete({_id: req.params.id})

        //check data is valid - so it cannot find out - throw an error
        if(!deleteData) throw {
            status: 400,
            message: "No route found"
        }
        res.status(200).send(deleteData) // show the route before deleting
    } catch (error) {
        res.status(error.status || 500).send({error:error.message} ||{error: error.message})
    }
}

const updateDataById = async (req,res)=>{
    //will it need an object or just value of id
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) throw {
        status: 400,
        message: 'Invalid ID'
    }
    const updataData = await routeModel.findOneAndUpdate({_id:req.params.id},req.body)
    if(!updataData) throw {
        status: 400,
        message: "No route found"
    }
    res.status(200).send(updataData) // show the route before update
}


export {getData, getDataById, postData, deleteDataById, updateDataById}