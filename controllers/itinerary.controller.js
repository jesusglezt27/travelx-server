const Itinerary = require("../models/Itinerary.model");
const mongoose = require("mongoose")


exports.getById = async (req,res,next)=>{
    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id) ){
            res.status(400).json({ messageErrors:"Ingresa un id"})
            return ;
        }

        const detialItinerary = await Itinerary.findById(id)
        res.status(200).json(detialItinerary)
    } catch (error) {
        next(error)
    }
}

exports.deleteItinerary = async (req,res,next)=>{
    try {
        //El nombre de mi variable dentro de los params (req.params) Yo la defino!!
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id) ){
            res.status(400).json({ messageErrors:"Ingresa un id"})
            return ;
        }
        await Itinerary.findByIdAndRemove(id)

        res.status(200).json({messageSuccess:"Tarea borrada"})
    } catch (error) {
        next(error)
    }
}

exports.updateItinerary = async (req,res,next)=>{
    try {
        const {id} = req.params
        if(!mongoose.Types.ObjectId.isValid(id) ){
            res.status(400).json({ messageErrors:"Ingresa un id"})
            return ;
        }
        const updatedItinerary = await Itinerary.findByIdAndUpdate(id,req.body,{new:true})

        res.status(200).json(updatedItinerary)
    } catch (error) {
        next(error)
    }
}

exports.createItinerary = async (req,res,next)=>{
    try {
        const {_id:_owner} = req.payload

        const intineraryCreated = await Itinerary.create({...req.body,_owner})
        res.status(200).json(intineraryCreated)

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ messageError: error.message });
          }
          if (error.code === 11000) {
            return res.status(400).json({
              messageError: "Error creating itinerary",
            });
          }
          return res.status(500).json({ messageError: error.message });
    }
}

exports.getAllItinerary = async(req,res,next)=>{
    
    try {
        const {_id:_owner} = req.payload
        const listItinerary = await Itinerary.find({_owner})
        res.status(200).json(listItinerary)
    } catch (error) {
      next(error)
    }
  }