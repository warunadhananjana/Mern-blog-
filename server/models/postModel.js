const {Schema, model} = require("mongoose")

const postSchema = new Schema({
    title: {type: String, require: true},
    category: {type: String, enum: ["Agriculture","Business","Education",
        "Entertainment","Art","Invesment","Uncategorozed","Weather"
    ], message:"VALUE is not supported"},
    description: {type: String, require: true},
    creator: {type: Schema.Types.ObjectId, ref:"User"},
    thumbnail: {type: String, require: true},
},{timestamps:true})

module.exports = model("Post", postSchema)