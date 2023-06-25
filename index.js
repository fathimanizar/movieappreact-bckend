const express = require('express');
const cors = require('cors');
const movieModel = require('./models/movieDb');
const path = require('path'); 


const app = new express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'/build'))); 


//....................... TO ADD MOVIE..........................
app.post('/api/addmovie',async(req,res)=>{
    console.log(req.body);
    var data = await new movieModel(req.body);
    data.save();
    res.send({status:"Movie is added"});
})

// ....................TO VIEW MOVIE LIST......................
app.get('/api/viewmovies',async(req,res)=>{
    var data = await movieModel.find();
    res.json(data);
    console.log(data);
})

//.................. TO DELETE A MOVIE.........................

app.delete('/api/deletemovie/:id',async(req,res)=>{
    let id = req.params.id;
    await movieModel.findByIdAndDelete(id);
    res.send({status:"Movie is deleted"});

})

// .................TO UPDATE A MOVIE.........................

app.put('/api/editmovie/:id',async(req,res)=>{
    let id = req.params.id;
    try{
        await movieModel.findByIdAndUpdate(id,req.body);
        res.json({status:"Movie is updated"});
    }
    catch(err){
        res.status(500).send(err);
    }
})

app.get('/*', function(req, res) { 
    res.sendFile(path.join(__dirname,'/build/index.html')); }); 

app.listen(3003,()=>{
    console.log("Server is up and running at 3003!!!");
})