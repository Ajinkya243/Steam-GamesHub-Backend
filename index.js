const {connectDB}=require("./db/db.connect");
const {Steam}=require("./models/steam.models");
const express=require('express');
const app=express();
app.use(express.json());
const cors=require('cors');
app.use(cors());
const port=process.env.PORT;

connectDB().then(()=>console.log("Connected to database.")).then(()=>{
    app.listen(port,()=>{
        console.log("Express running port:",port)
    })
})

app.get("/",async(req,resp)=>{
    try{
        resp.send("Api working")
    }
    catch(error){
        resp.status(500).json("Error occur")
    }
})

//get all data

const getData=async()=>{
    const games=await Steam.find();
    console.log(games);
    return games;
}
app.get("/steam",async(req,resp)=>{
    try{
       const games=await getData();
       if(games){
        
        resp.send(games);
       } 
       else{
        resp.status(404).json({message:"Games not found."})
       }
    }
    catch(error){
        resp.status(500).json({error:"Error occur while fetching data."})
    }
})

//find data by id

const getGameById=async(id)=>{
    const game=await Steam.findById(id);
    return game;
}

app.get("/steam/_id/:id",async(req,resp)=>{
    try{
        const game=await getGameById(req.params.id);
        if(game){
            resp.send(game);
        }
        else{
            resp.status(404).json({message:"Game not found."})
        }
    }
    catch(error){
        resp.status(500).json({error:"Error Occur while fetching."})
    }
})

//post game to database
const postGame=async(data)=>{
    const game=await Steam(data);
    game.save();
    return game;
}

app.post("/steam",async(req,resp)=>{
    try{
        const game=await postGame(req.body);
       
            resp.send(game);
        
    }
    catch(error){
        resp.status(500).json({error:"Error occur while posting data."})
    }
})

//get games by price filter

const getFilterByPrice=async(price)=>{
    const games=await Steam.find({price:{$gte:0,$lte:price}})
    return games;
}

app.get("/steam/price",async(req,resp)=>{
    try{
        const maxPrice= +(req.query.maxPrice);
        const games=await getFilterByPrice(maxPrice);
        if(games){
            resp.send(games)
        }
        else{
            resp.status(404).json({message:"No games found."})
        }
    }
    catch(error){
        resp.status(500).json({error:"Error occur while fetching"})
    }
})

// get games by category

const getGamesByCategory=async(category)=>{
    const games=await Steam.find({genre:category});
    return games;
}

app.get("/steam/category",async(req,resp)=>{
    try{
        const genre=req.query.genre;
        const games=await getGamesByCategory(genre);
        if(games){
            resp.send(games);
        }
        else{
            resp.status(404).json({message:"Games not found."})
        }
    }
    catch(error){
        resp.status(500)/json({error:"Error occur while fetching data."})
    }
})

//get games by reviews basis

const getGamesByRevies=async(review)=>{
    const games=await Steam.find({allReviews:{$regex:review,$options:'i'}});
    return games;
}

app.get('/steam/reviews',async(req,resp)=>{
    try{
        const review=req.query.review;
        const games=await getGamesByRevies(review);
        if(games){
            resp.send(games);
        }
        else{
            resp.status(404).json({message:"No games found."})
        }
    }
    catch(error){
        resp.status(500).json({error:"Error occur while fetching data."})
    }
})

//get games by publisher name

const getGamesByPublisher=async(publisher)=>{
const games=await Steam.find({publisher:publisher});
return games;
}

app.get("/steam/publisher/:publisher",async(req,resp)=>{
    try{
        const games=await getGamesByPublisher(req.params.publisher)
        if(games){
            resp.send(games);
        }
        else{
            resp.status(404).json({message:"Games not found."});
        }

    }
    catch(error){
        resp.status(500).json({error:"Error occur while fetching data."})
    }
})

//update by id

const updateDataById=async(id,data)=>{
    const game=await Steam.findByIdAndUpdate(id,data,{new:true});
    return game;
}

app.post("/steam/update/:id",async(req,resp)=>{
    try{
        const game=await updateDataById(req.params.id,req.body);
            if(game){
                resp.send(game);
            }
            else{
                resp.status(404).json({message:"Game not found."})
            }
    }
    catch(error){
        resp.status(500).json({error:"Error occur while fetching data"})
    }
})

const getDataByInputTitle=async(data)=>{
    const games=await Steam.find({name:{$regex:data,$options:'i'}})
    return games;
}

app.get("/steam/name",async(req,resp)=>{
    try{
        //const input=req.query.input;
        const games=await getDataByInputTitle(req.query.input);
        if(games.length){
            resp.send(games);
        }
        else{
            resp.status(404).json({message:"No games found"})
        }
    }
    catch(error){
        throw Error("Error occur while fetching")
    }
})
