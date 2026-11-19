const mongoose=require("mongoose")

const expenseSchema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref : "user"},
    title : String,
    category : {type : String, enum :["Food","Transport","Entertainment","Shopping","Other"]},
    amount : Number,
    timestamp : {type : Date, default : Date.now}
})

const expenseModel= mongoose.model("expense",expenseSchema)

module.exports=expenseModel