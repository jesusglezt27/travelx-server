const { Schema,model } = require("mongoose")

const itinerarySchema = new Schema({
    image: {
        type: String,
        default: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    title:{
        type:String,
        required:true,
        minLength:2,
    },
    duration:{
        type:Number,
    },
    country:String,
    city:String,
    flightDetails:{
        type:[
            {
                airline:{
                    type:String,
                },
                date:{
                    type:String,
                },
                time:{
                    type:String,
                },
                departure:{
                    type:String
                },
                arrival:{
                    type:String
                }
            }
        ]
    },
    hotelDetails:{
        type:[
            {
                hotelName:{
                    type:String,
                },
                checkIn:{
                    type:String,
                },
                checkOut:{
                    type:String,
                }
            }
        ]
    },
    activities:{
        type:[
            {
                title:{
                    type:String,
                },
                date:{
                    type:String,
                },
                time:{
                    type:String,
                },
                location:{
                    type:String
                },
                notes:{
                    type:String
                },
                img_url:String 
            }
        ]
    },
    notes:{
        type:[
            {
            description:{
            type:String,
            },
            }
        ]
    },
    _owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

module.exports = model("Itinerary",itinerarySchema)