const mongoose= require("mongoose");

const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type: String,
        required: true
    },
    message: { 
        type:String,
        maxlenght: 50
    },
    created_at:{
        type:Date
    },
    updated_at:{
        type: Date,
    }
});

// creating the model

let Chat= mongoose.model("Chat",chatSchema);

// exporting the model for requiring in the index.js
module.exports= Chat;

// ye ham basically hamare model ke liyeusekarre raha hai 