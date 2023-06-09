import mongoose from "mongoose";

const Post=new mongoose.Schema({
    name:{type: String,required:true},
    prompt:{type: String,required:true},
    photo:{type:String,required:true},
    photos:[String],
    profilePhoto:{type: String,required:true},
    numberOfImages:{type:Number,required:true}
})

const PostSchema=mongoose.model('Post',Post);

export default PostSchema;