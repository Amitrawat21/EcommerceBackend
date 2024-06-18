import mongoose from "mongoose"


const orderSchema = mongoose.Schema({
    
    email : {
        type : String,
        required :true,
        
    },

    orderList :{
        type : Array
    }


})

const Order = mongoose.model("order" , orderSchema)

export default Order
