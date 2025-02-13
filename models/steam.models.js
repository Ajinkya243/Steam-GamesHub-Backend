
const mongoose=require('mongoose');

const steamSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
    price:{
        type:Number,
        default:0
    },
    genre:{
        type:String,
        required:true
    },
    releaseDate:{
        type:String,
        required:true
    },
    developer:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    tags:[{
        type:String,
        required:true
    }],
    screenShots:[{
        type:String
    }],
    videoUrl:{
        type:String,
        default:null
    },
    recentReviews:{
        type:String,
        required:true
    },
    allReviews:{
        type:String,
        required:true
    },
    companyLogo:{
        type:String
    }

})

const Steam=mongoose.model("Steam",steamSchema);

module.exports={Steam}